import ApiError from "../utils/ApiError.js";
import { findUserByEmail, findUserById } from "./db.service.js";
import { generateAccessToken, generateRefreshToken } from "./jwt.service.js";
const adminLoginService = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  if (user.role !== "admin") {
    throw ApiError.forbidden("Access denied");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw ApiError.unauthorized("Invalid credentials");
  }
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  user.refreshToken = refreshToken;
  await user.save();
  return { user, accessToken, refreshToken };
};

export { adminLoginService };
