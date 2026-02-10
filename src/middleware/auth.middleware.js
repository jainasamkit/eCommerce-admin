import ApiError from "../error/ApiError.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || token === "") {
      throw new Error("TOKEN_NOT_PROVIDED");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
