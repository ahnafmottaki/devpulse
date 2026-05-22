import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(process.cwd(), `.env`),
});

const config = {
  port: process.env.PORT && parseInt(process.env.PORT),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  bcryptSaltRounds:
    process.env.BCRYPT_SALT_ROUNDS && parseInt(process.env.BCRYPT_SALT_ROUNDS),
};

const validateConfig = () => {
  for (const [key, value] of Object.entries(config)) {
    if (!value) {
      throw new Error(`Config '${key}' is not defined`);
    }
  }
  console.log("config validated successfully");
  return config;
};

export default validateConfig();
