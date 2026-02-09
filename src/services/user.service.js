import { findUserByEmail, saveUser } from "../repository/user.repository.js";
import { generateAccessToken, generateRefreshToken } from "./jwt.service.js";

const adminLoginService = async (email, password) => {
  const user = await findUserByEmail(email);

  if (user.role !== "admin") {
    throw new Error("ACCESS_DENIED");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await saveUser(user);

  return { user, accessToken, refreshToken };
};

export { adminLoginService };
