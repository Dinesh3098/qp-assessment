import { Request, Response } from "express";
import { HandlerFunction } from "./handler";


const pongHandler:HandlerFunction = (req, res) => {
  res.json({ message: "pong" });
};

export default pongHandler;