import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT || 5000,
  DB_URL: process.env.DB_URL,
  ACCESS_SECRET: process.env.ACCESS_SECRET,
  ACCESS_EXPIRY: process.env.ACCESS_EXPIRY,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  REFRESH_EXPIRY: process.env.REFRESH_EXPIRY,
};

export default env;
