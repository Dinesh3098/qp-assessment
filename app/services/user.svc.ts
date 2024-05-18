import { count_groceries_item, get_groceries } from "../constants/queries/user.query";
import { getDatabasePool } from "../database/postgres.db";
import { Grocery } from "../models/grocery.model";
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
