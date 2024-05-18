import { Request, Response } from "express";
import { User } from "../models/user.model";

export interface CustomRequest extends Request {
  user?: User;
}
export type HandlerFunction = (req: CustomRequest, res: Response) => void;
