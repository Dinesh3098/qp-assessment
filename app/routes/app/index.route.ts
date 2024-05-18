import express, { Router } from "express";

import { RouterFunction } from "../index.route";
import { signupHandler, loginHandler } from "../../handlers/app.handler";

const appRoutes: RouterFunction = (): Router => {
  const router: Router = express.Router();
  router.post("/signup", signupHandler);
  router.post("/login", loginHandler);
  return router;
};

export default appRoutes;
