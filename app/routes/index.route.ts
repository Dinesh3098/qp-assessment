import express, { Router } from "express";
import pongHandler from "../handlers/pong";

const router: Router = express.Router();

router.get("/ping", pongHandler);

export default router;
