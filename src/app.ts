import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import issueRouter from "./modules/issue/issue.route.js";
import authRouter from "./modules/auth/auth.route.js";
app.use("/api/issues", issueRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

export default app;
