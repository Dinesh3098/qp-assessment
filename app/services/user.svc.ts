import { Pool } from "pg";
import {
  acquire_lock_on_grocery,
  check_inventory,
  count_groceries_item,
  get_groceries,
  insert_order,
  insert_order_items,
  reduce_inventory,
} from "../constants/queries/user.query";
import { getDatabasePool } from "../database/postgres.db";
import { Grocery, GroceryItems } from "../models/grocery.model";
import { logger } from "../utils/logger.util";

export const getGroceriesSvc: (
  page: number,
  limit: number,
  name: string
) => Promise<Grocery[]> = async (page: number, limit: number, name: string) => {
  const offset = (page - 1) * limit;
  let values = [name, offset, limit];

  try {
    const pool = await getDatabasePool();
    const { rows } = await pool.query(get_groceries, values);
    const groceries: Grocery[] = rows;

    return groceries;
  } catch (err: unknown) {
    logger.error("Unable to get groceries from database: ", err);
    throw err;
  }
};

export const countGroceriesItemSvc: (name: string) => Promise<number> = async (
  name: string
) => {
  try {
    const pool = await getDatabasePool();
    const countResult = await pool.query(count_groceries_item, [name]);
    const totalItems = parseInt(countResult.rows[0].count, 10);
    return totalItems;
  } catch (err: unknown) {
    logger.error("Unable to get groceries from database: ", err);
    throw err;
  }
};

export const placeOrderSvc: (
  userId: string,
  items: GroceryItems[]
) => Promise<number> = async (user_id: string, items: GroceryItems[]) => {
  let pool: Pool;
  try {
    pool = await getDatabasePool();
  } catch (error: any) {
    logger.error("Unable to connect to database: ", error);
    throw error;
  }

  try {
    await pool.query("BEGIN");

    await checkAndReduceInventory(pool, items);

    const orderResult = await pool.query(insert_order, [user_id]);
    const order_id: number = orderResult.rows[0].id;

    for (const item of items) {
      await pool.query(insert_order_items, [
        order_id,
        item.grocery_id,
        item.quantity,
      ]);
    }
    await pool.query("COMMIT");
    return order_id
  } catch (err: unknown) {
    await pool.query("ROLLBACK");
    logger.error("Unable to place order in database: ", err);
    throw err;
  }
};

async function checkAndReduceInventory(
  pool: Pool,
  items: GroceryItems[]
): Promise<void> {
  try {
    // Acquire advisory locks for all items
    for (const item of items) {
      await pool.query(acquire_lock_on_grocery, [item.grocery_id]);
    }

    // Check if enough inventory is available for all items
    for (const item of items) {
      const { rows } = await pool.query(check_inventory, [item.grocery_id]);
      const currentInventory = rows[0].inventory;

      if (currentInventory < item.quantity) {
        throw new Error(`Not enough inventory for item ${item.grocery_id}`);
      }
    }

    // Reduce inventory for all items
    for (const item of items) {
      await pool.query(reduce_inventory, [item.quantity, item.grocery_id]);
    }
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
}
