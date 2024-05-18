import { getDatabasePool } from "../database/postgres.db";
import { logger } from "../utils/logger.util";

export const insertSampleData: () => Promise<void> = async () => {
  const client = await getDatabasePool();

  try {
    const sampleUserQuery = "SELECT 1 FROM users WHERE username = $1";
    const sampleUserResult: any = await client.query(sampleUserQuery, [
      "admin",
    ]);
    if (
      sampleUserResult &&
      sampleUserResult?.rowCount &&
      sampleUserResult.rowCount > 0
    ) {
      logger.info("Sample data already exists");
      return;
    }
    await client.query("BEGIN");

    await client.query(`
      INSERT INTO users (username, password, role) VALUES
      ('admin', 'hashedpassword1', 'admin'),
      ('user1', 'hashedpassword2', 'user'),
      ('user2', 'hashedpassword3', 'user');
    `);

    await client.query(`
      INSERT INTO groceries (name, price, inventory) VALUES
      ('Apple', 0.5, 100),
      ('Banana', 0.3, 150),
      ('Carrot', 0.2, 200);
    `);

    await client.query(`
      INSERT INTO orders (user_id) VALUES
      (2), -- user1
      (3); -- user2
    `);

    await client.query(`
      INSERT INTO order_items (order_id, grocery_id, quantity) VALUES
      (1, 1, 10), -- Order 1, Apple
      (1, 2, 5),  -- Order 1, Banana
      (2, 3, 20); -- Order 2, Carrot
    `);

    await client.query("COMMIT");
    logger.info("Sample data inserted successfully");
  } catch (error) {
    await client.query("ROLLBACK");
    logger.error("Error inserting sample data: ", error);
  }
};
