import { Pool } from "pg";
import config from "../config/config.js";
console.log(config);

const pool = new Pool({
  host: "aws-1-ap-northeast-2.pooler.supabase.com",
  port: 6543,
  database: "postgres",
  user: "postgres.mjvrncjuukfocwdekwzz",
  password: "4kr?MMbr^n-SF3$t",
});

const initializeDatabase = async () => {
  console.log(config.databaseUrl);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users  (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL CHECK(role IN ('maintainer', 'contributor')) DEFAULT 'contributor',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `);

  await pool.query(`
      CREATE TABLE IF NOT EXISTS issues (
        id SERIAL PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT NOT NULL CHECK(length(description) >= 20),
        type VARCHAR(20) NOT NULL CHECK(type IN ('bug', 'feature_request')),
        status VARCHAR(20) NOT NULL CHECK(status IN ('open', 'in_progress', 'resolved')),
        reporter_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

  console.log("Database initialized successfully.");
  console.log("Tables 'users' and 'issues' are ready.");
};

export { pool, initializeDatabase };
