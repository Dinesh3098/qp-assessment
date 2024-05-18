import { Request, Response } from "express";
import { HandlerFunction } from "./handler";
import { addGrocerySvc } from "../services/admin.svc";

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
    res.status(201).json(grocery);
  } catch (err: any) {
    res.status(500).json({ msg: "error while adding grocery", error: err });
  }
};
