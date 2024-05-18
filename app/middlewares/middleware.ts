import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../handlers/handler";


export type MiddlewareFunction = (req: CustomRequest, res: Response, next: NextFunction) => void;
