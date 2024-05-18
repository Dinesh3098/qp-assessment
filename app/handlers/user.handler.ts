import { Request, Response } from "express";
import { HandlerFunction } from "./handler";
import { getGroceriesSvc, countGroceriesItemSvc } from "../services/user.svc";
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
