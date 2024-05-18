import { Request, Response } from "express";
import { HandlerFunction } from "./handler";


const pongHandler:HandlerFunction = (req: Request, res: Response) => {
  res.json({ message: "pong" });
};

export default pongHandler;