import mongoose from "mongoose";
import env from "./env.js";
async function connectDB() {
  try {
    const connection = await mongoose.connect(env.DB_URL);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;
