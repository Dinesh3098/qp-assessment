import express, { Express, Router } from "express";
import pongHandler from "../handlers/pong.handler";
import adminRoutes from "./admin/index.route";
import userRoutes from "./user/index.route";
import appRoutes from "./app/index.route";
import { authMiddleware } from "../middlewares/auth.middleware";

export type RouterFunction = () => Router;

export const routes: RouterFunction = (): Router => {
  const router: Router = express.Router();

  router.get("/ping", pongHandler);
  router.use("/admin", authMiddleware(["admin"]), adminRoutes());
  router.use("/user", authMiddleware(["user"]), userRoutes());
  router.use("/app", appRoutes());

  return router;
};
