import { Pool } from "pg";
import { logger } from "../utils/logger.util";

let pool: Pool;
type databasePoolFunction = () => Promise<Pool>;

export const getDatabasePool: databasePoolFunction =
  async (): Promise<Pool> => {
    if (!pool) {
      const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } =
        process.env;
      pool = new Pool({
        host: PGHOST,
        database: PGDATABASE,
        user: PGUSER,
        password: PGPASSWORD,
        port: 5432,
        ssl: true,
        options: `project=${ENDPOINT_ID}`,
      });

      try {
        await pool.query("SELECT 1");
        logger.info("Connected to PostgreSQL");
      } catch (error: any) {
        logger.error("Failed to connect to PostgreSQL", error);
      }
    }

    return pool;
  };
