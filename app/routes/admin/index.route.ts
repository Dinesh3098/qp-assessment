import express, { Router } from "express";
import {
  addGrocery,
  getGroceries,
  updateGrocery,
} from "../../handlers/admin.handler";
import { RouterFunction } from "../index.route";

const adminRoutes: RouterFunction = (): Router => {
  const router: Router = express.Router();
  router.post("/grocery", addGrocery);
  router.get("/groceries", getGroceries);
  router.put("/grocery/:id", updateGrocery);
  //   router.delete("/grocery/:id", );
  return router;
};

export default adminRoutes;
