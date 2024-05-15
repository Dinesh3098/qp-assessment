import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "../app/routes/index.route";
import { logRequest, logger } from "../app/utils/logger.util";

dotenv.config();

const app: Express = express();
const port: string = process.env.APP_PORT || "3000";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", logRequest, router);

app.listen(port, () => {
  logger.info(`Server is running on port %s`, port);
});
