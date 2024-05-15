import { Request, Response } from "express";

const pongHandler = (req: Request, res: Response) => {
  res.json({ message: "pong" });
};

export default pongHandler;