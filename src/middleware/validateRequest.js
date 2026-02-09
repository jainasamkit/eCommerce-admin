import ApiError from "../utils/ApiError.js";

export const validateRequest = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const messages = [
      ...new Set(result.error.issues.map((err) => err.message)),
    ];

    throw ApiError.badRequest(messages.join(", "));
  }

  req.body = result.data;
  next();
};
