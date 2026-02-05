// middleware/validateRequest.js
import apiError from "../utils/apiError.js";

export const validateRequest = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.issues.map((err) => err.message).join(", ");
    return next(new apiError(400, message));
  }

  req.body = result.data; // sanitized & typed
  next();
};
