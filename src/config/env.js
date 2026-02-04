import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const ACCESS_EXPIRY = process.env.ACCESS_EXPIRY;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const REFRESH_EXPIRY = process.env.REFRESH_EXPIRY;

export {
  PORT,
  DB_URL,
  ACCESS_SECRET,
  ACCESS_EXPIRY,
  REFRESH_SECRET,
  REFRESH_EXPIRY,
};
