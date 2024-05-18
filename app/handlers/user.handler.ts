import { Request, Response } from "express";
import { HandlerFunction } from "./handler";
import {
  getGroceriesSvc,
  countGroceriesItemSvc,
  placeOrderSvc,
} from "../services/user.svc";
import { logger } from "../utils/logger.util";
import { Grocery } from "../models/grocery.model";

export const getGroceries: HandlerFunction = async (
  req: Request,
  res: Response
) => {
  const page: number = parseInt(req.query.page as string) || 1;
  const limit: number = parseInt(req.query.limit as string) || 5;
  const name: string = req.query.search ? `%${req.query.search}%` : "%";

  logger.info("query", req.query);

  try {
    const groceries: Grocery[] = await getGroceriesSvc(page, limit, name);
    const totalItems: number = await countGroceriesItemSvc(name);
    const totalPages: number = Math.ceil(totalItems / limit);
    logger.info("Groceries fetched successfully");
    res.json({
      page,
      limit,
      totalPages,
      totalItems,
      groceries,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.toString() });
  }
};

export const placeOrder: HandlerFunction = async (req, res) => {
  const { user_id, items } = req.body;

  if (!user_id || !items) {
    logger.error("All fields are required");
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const order_id = await placeOrderSvc(user_id, items);

    res.status(201).json({ msg: "Order placed successfully", order_id });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};
