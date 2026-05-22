import config from "./config/config.js";
import app from "./app.js";
import { initializeDatabase } from "./db/index.js";

const main = async () => {
  await initializeDatabase();
  app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
  });
};

main().catch((error) => {
  console.error("Error starting the server:", error);
  process.exit(1);
});
