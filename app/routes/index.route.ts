import express, { Express, Router } from "express";
import pongHandler from "../handlers/pong.handler";
import adminRoutes from "./admin/index.route";
import userRoutes from "./user/index.route";

export type RouterFunction = () => Router;

export const routes: RouterFunction = (): Router => {
  const router: Router = express.Router();

  router.get("/ping", pongHandler);
  router.use("/admin", adminRoutes());
  router.use("/user", userRoutes());

  return router;
};
