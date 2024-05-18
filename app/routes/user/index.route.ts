import express, { Router } from "express";
import {
  getGroceries,
  placeOrder,
} from "../../handlers/user.handler";
import { RouterFunction } from "../index.route";

const userRoutes: RouterFunction = (): Router => {
  const router: Router = express.Router();
  router.get("/groceries", getGroceries);
  router.post("/order", placeOrder);
  return router;
};

export default userRoutes;
