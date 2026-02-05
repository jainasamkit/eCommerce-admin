import mongoose from "mongoose";
import { DB_URL } from "./env.js";
async function connectDB() {
  try {
    const connection = await mongoose.connect(DB_URL);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;
