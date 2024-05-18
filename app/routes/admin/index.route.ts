import express, { Router } from "express";
import { addGrocery, getGroceries } from "../../handlers/admin.handler";
import { RouterFunction } from "../index.route";

const adminRoutes: RouterFunction = (): Router => {
  const router: Router = express.Router();
  router.post("/grocery", addGrocery);
  router.get("/groceries", getGroceries);
  //   router.put("/grocery/:id", );
  //   router.delete("/grocery/:id", );
  return router;
};

export default adminRoutes;
