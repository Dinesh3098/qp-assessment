import { add_new_grocery } from "../constants/queries/admin.query";
import { getDatabasePool } from "../database/postgres.db";
import { Grocery } from "../models/grocery.model";
import { logger } from "../utils/logger.util";

export const addGrocerySvc: (
  name: string,
  price: number,
  inventory: number
) => Grocery | any = async (name: string, price: number, inventory: number) => {
  const values = [name, price, inventory];

  try {
    const pool = await getDatabasePool();
    const { rows } = await pool.query(add_new_grocery, values);
    const grocery: Grocery = rows[0];
    return grocery;
  } catch (err: any) {
    logger.error("Unable to insert grocery in database", err, values);
    throw err;
  }
};
