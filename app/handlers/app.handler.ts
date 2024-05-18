import { getDatabasePool } from "../database/postgres.db";
import { User } from "../models/user.model";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../utils/auth.util";
import { HandlerFunction } from "./handler";

export const signupHandler: HandlerFunction = async (req, res) => {
  const { username, password, role } = req.body;

  const hashedPassword = await hashPassword(password);
  const insertUser = `
      INSERT INTO users (username, password, role)
      VALUES ($1, $2, $3)
      RETURNING id, username, role;
    `;
  const values = [username, hashedPassword, role];

  try {
    const pool = await getDatabasePool();
    const { rows } = await pool.query(insertUser, values);
    const user: User = rows[0];
    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err: any) {
    res.status(500).json({ error: err.toString() });
  }
};

export const loginHandler: HandlerFunction = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const getUser = "SELECT * FROM users WHERE username = $1;";
  const values = [username];

  try {
    const pool = await getDatabasePool();
    const { rows } = await pool.query(getUser, values);
    if (rows.length === 0) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const user: User = rows[0];
    const isPasswordValid = await comparePassword(password, String(user.password));
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    user.password = undefined;

    const token = generateToken(user);
    res.json({ user, token });
  } catch (err: any) {
    res.status(500).json({ error: err.toString() });
  }
};
