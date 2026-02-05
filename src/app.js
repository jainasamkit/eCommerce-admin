import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import v1router from "./routes/index.js";
import apiError from "./utils/apiError.js";

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

app.use("/api/v1", v1router);
app.use((req, res, next) => {
  next(new apiError(404, "Route not found"));
});
app.use(errorHandler);

export default app;
