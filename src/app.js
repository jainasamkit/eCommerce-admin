import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/error", (req, res) => {
  const err = new Error("This is a test error");
  err.statusCode = 500;
  throw err;
});
app.use(errorHandler);

import v1router from "./routes/index.js";
app.use("/api/v1", v1router);

export default app;
