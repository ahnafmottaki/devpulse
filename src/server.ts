import app from "./app.js";

const main = async () => {
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
};

main().catch((error) => {
  console.error("Error starting the server:", error);
  process.exit(1);
});
