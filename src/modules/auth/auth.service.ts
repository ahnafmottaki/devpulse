import config from "../../config/config.js";
import { pool } from "../../db/index.js";
import { type RegisterBody, type User } from "./auth.repository.js";
import bcrypt from "bcryptjs";

const loginUser = async () => {};

const registerUser = async (userDetails: RegisterBody) => {
  const { name, email, password, role } = userDetails;
  const hashedPassword = await bcrypt.hash(password, config.bcryptSaltRounds);
  const dbResponse = await pool.query<User>(
    `
    INSERT INTO users(name, email, password, role)
    VALUES($1, $2, $3, $4) RETURNING *
    `,
    [name, email, hashedPassword, role],
  );
  const { password: _, ...rest } = dbResponse.rows[0]!;
  return rest;
};

export const authService = {
  loginUser,
  registerUser,
};
