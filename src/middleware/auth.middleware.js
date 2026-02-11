import ApiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { ACCESS_SECRET } from "../config/env.js";
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || token === "") {
      throw new Error("TOKEN_NOT_PROVIDED");
    }
    const decoded = jwt.verify(token, ACCESS_SECRET);
    if (!decoded) {
      throw new Error("TOKEN_INVALID");
    }
    req.user = decoded;
    next();
  } catch (error) {
    if (error.message === "TOKEN_NOT_PROVIDED") {
      throw ApiError.unauthorized("Token not provided");
    }
    if (error.message === "TOKEN_INVALID") {
      throw ApiError.unauthorized("Invalid token");
    }
    throw ApiError.internal("Cant verify token.");
  }
};

const verifyAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      throw new Error("ACCESS_DENIED");
    }
    next();
  } catch (error) {
    if (error.message === "ACCESS_DENIED") {
      throw ApiError.forbidden("Access denied");
    }
    throw ApiError.internal("Error verifying admin access");
  }
};

export { verifyToken, verifyAdmin };
