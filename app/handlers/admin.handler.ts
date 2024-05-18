import { Request, Response } from "express";
import { HandlerFunction } from "./handler";
import { addGrocerySvc, getGroceriesSvc } from "../services/admin.svc";
import { logger } from "../utils/logger.util";

export const addGrocery: HandlerFunction = async (
  req: Request,
  res: Response
) => {
  const { name, price, inventory } = req.body;

  if (!name || !price || !inventory) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    let grocery = await addGrocerySvc(name, price, inventory);
    logger.info("Grocery added successfully");
    res.status(201).json(grocery);
  } catch (err: any) {
    res.status(500).json({ msg: "error while adding grocery", error: err });
  }
};

export const getGroceries: HandlerFunction = async (
  req: Request,
  res: Response
) => {
  let { page, limit } = req.query;
  if (!page){
    page = "1";
  }
  if (!limit){
    limit = "5";
  }

  try {
    const groceries = await getGroceriesSvc(Number(page),  Number(limit));
    logger.info("Groceries fetched successfully");
    res.status(200).json({page, limit, groceries});
  } catch (err: any) {
    res.status(500).json({ msg: "error while getting groceries", error: err });
  }
}