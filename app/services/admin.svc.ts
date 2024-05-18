import {
  add_new_grocery,
  get_groceries,
  update_grocery,
} from "../constants/queries/admin.query";
import { getDatabasePool } from "../database/postgres.db";
import { Grocery } from "../models/grocery.model";
import { logger } from "../utils/logger.util";

export const addGrocerySvc: (
  name: string,
  price: number,
  inventory: number
) => Promise<Grocery> = async (
  name: string,
  price: number,
  inventory: number
) => {
  const values = [name, price, inventory];

  try {
    const pool = await getDatabasePool();
    const { rows } = await pool.query(add_new_grocery, values);
    const grocery: Grocery = rows[0];
    return grocery;
  } catch (err: unknown) {
    logger.error("Unable to insert grocery in database", err, values);
    throw err;
  }
};

export const getGroceriesSvc: (
  page: number,
  limit: number
) => Promise<Grocery[]> = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;

  const values = [offset, limit];
  try {
    const pool = await getDatabasePool();
    const { rows } = await pool.query(get_groceries, values);
    const groceries: Grocery[] = rows;
    return groceries;
  } catch (err: unknown) {
    logger.error("Unable to get groceries from database", err);
    throw err;
  }
};

export const updateGrocerySvc: (
  id: number,
  name: string,
  price: number,
  inventory: number
) => Promise<Grocery> = async (
  id: number,
  name: string,
  price: number,
  inventory: number
) => {
  const values = [name, price, inventory, id];

  try {
    const pool = await getDatabasePool();
    const { rows } = await pool.query(update_grocery, values);
    const grocery: Grocery = rows[0];
    return grocery;
  } catch (err: unknown) {
    logger.error("Unable to update grocery in database", err, values);
    throw err;
  }
}