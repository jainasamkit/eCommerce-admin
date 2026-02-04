import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/error", (req, res) => {
  const err = new Error("This is a test error");
  err.statusCode = 500;
  throw err;
});
app.use(errorHandler);

export default app;
