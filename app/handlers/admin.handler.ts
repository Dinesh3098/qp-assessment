import { HandlerFunction } from "./handler";
import {
  addGrocerySvc,
  deleteGrocerySvc,
  getGroceriesSvc,
  updateGrocerySvc,
} from "../services/admin.svc";
import { logger } from "../utils/logger.util";

export const addGrocery: HandlerFunction = async (req, res) => {
  const { name, price, inventory } = req.body;

  if (!name || !price || !inventory) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    let grocery = await addGrocerySvc(name, price, inventory);
    logger.info("Grocery added successfully");
    res.status(201).json(grocery);
  } catch (err: unknown) {
    res.status(500).json({ msg: "error while adding grocery", error: err });
  }
};

export const getGroceries: HandlerFunction = async (req, res) => {
  let page = parseInt(req.query.page as string) || 1;
  let limit = parseInt(req.query.limit as string) || 5;

  try {
    const groceries = await getGroceriesSvc(page, limit);
    logger.info("Groceries fetched successfully");
    res.status(200).json({ page, limit, groceries });
  } catch (err: unknown) {
    res.status(500).json({ msg: "error while getting groceries", error: err });
  }
};

export const updateGrocery: HandlerFunction = async (req, res) => {
  const { id } = req.params;
  const { name, price, inventory } = req.body;
  const values = [name, price, inventory, id];

  try {
    const grocery = await updateGrocerySvc(Number(id), name, price, inventory);
    logger.info("Grocery updated successfully");
    res.status(200).json(grocery);
  } catch (err: unknown) {
    res.status(500).json({ error: err });
  }
};

export const deleteGrocery: HandlerFunction = async (req, res) => {
  const { id } = req.params;

  try {
    const grocery = await deleteGrocerySvc(Number(id));
    logger.info("Grocery deleted successfully");
    res.status(200).json({ msg: "Grocery deleted successfully", ...grocery });
  } catch (err: any) {
    res
      .status(500)
      .json({ msg: "error while deleting grocery", error: err.toString() });
  }
};
