import express, { Router } from "express";
import { addGrocery } from "../../handlers/admin.handler";
import { RouterFunction } from "../index.route";


const adminRoutes: RouterFunction  = (): Router => {
  const router: Router = express.Router();
  router.post("/grocery", addGrocery);
  return router;
};

export default adminRoutes;
