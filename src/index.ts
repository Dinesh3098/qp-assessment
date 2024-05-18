import express, { Express } from "express";
import dotenv from "dotenv";
import { logRequest, logger } from "../app/utils/logger.util";
import createTablesMigration from "../app/migrations/001-initial-schema";
import { routes } from "../app/routes/index.route";
import { insertSampleData } from "../app/migrations/002-insert-sample-data";

dotenv.config();

const app: Express = express();

// run migrations
{
  (async () => {
    await createTablesMigration();
    await insertSampleData();
  })();
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logRequest, routes());

const port: string = process.env.APP_PORT || "3000";
app.listen(port, () => {
  logger.info(`Server is running on port %s`, port);
});
