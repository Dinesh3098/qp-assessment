import express, { Router } from "express";
import {
  getGroceries,
} from "../../handlers/user.handler";
import { RouterFunction } from "../index.route";

const userRoutes: RouterFunction = (): Router => {
  const router: Router = express.Router();
  router.get("/groceries", getGroceries);
  
  return router;
};

export default userRoutes;
