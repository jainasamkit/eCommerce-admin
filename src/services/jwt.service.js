import jwt from "jsonwebtoken";
import {
  ACCESS_SECRET,
  ACCESS_EXPIRY,
  REFRESH_SECRET,
  REFRESH_EXPIRY,
} from "../config/env.js";

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name, role: user.role },
    ACCESS_SECRET,
    {
      expiresIn: ACCESS_EXPIRY,
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRY,
  });
};

export { generateAccessToken, generateRefreshToken };
