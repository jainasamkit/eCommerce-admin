import ApiError from "../utils/ApiError.js";

export const validateRequest = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.issues.map((err) => err.message).join(", ");
    throw ApiError.badRequest(message);
  }

  req.body = result.data;
  next();
};
