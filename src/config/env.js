import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT || 5000,
  DB_URL: process.env.DB_URL,
  ACCESS_SECRET: process.env.ACCESS_SECRET,
  ACCESS_EXPIRY: process.env.ACCESS_EXPIRY,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  REFRESH_EXPIRY: process.env.REFRESH_EXPIRY,
  R2_ACCESS_KEY: process.env.R2_ACCESS_KEY,
  R2_SECRET_KEY: process.env.R2_SECRET_KEY,
  R2_ENDPOINT: process.env.R2_ENDPOINT,
  R2_BUCKET: process.env.R2_BUCKET,
  R2_PUBLIC_URL: process.env.R2_PUBLIC_URL,
};

export const {
  PORT,
  DB_URL,
  ACCESS_SECRET,
  ACCESS_EXPIRY,
  REFRESH_SECRET,
  REFRESH_EXPIRY,
  R2_ACCESS_KEY,
  R2_SECRET_KEY,
  R2_ENDPOINT,
  R2_BUCKET,
  R2_PUBLIC_URL,
} = env;
