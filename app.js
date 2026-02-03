import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
await connectDB();
const PORT = 8000;

app.get("/", (_, res) => {
  return res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
