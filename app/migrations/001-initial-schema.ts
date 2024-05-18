import { logger } from "../utils/logger.util";
import { getDatabasePool } from "../database/postgres.db";
import { Pool } from "pg";
import { create_tables } from "../constants/queries/migration.query";

const createTablesMigration: () => Promise<void> = async () => {
  let client: Pool;
  try {
    client = await getDatabasePool();
  } catch (error: any) {
    logger.error("getDatabasePool()", error);
    return;
  }
  try {
    await client.query(create_tables);
    logger.info("User table migration created successfully");
  } catch (error: any) {
    logger.debug("error", error);
  }
};

export default createTablesMigration;
