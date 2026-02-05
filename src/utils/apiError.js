class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }

  // 400
  static badRequest(message = "Bad Request", errors = []) {
    return new ApiError(400, message, errors);
  }

  // 401
  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }

  // 403
  static forbidden(message = "Forbidden") {
    return new ApiError(403, message);
  }

  // 404
  static notFound(message = "Resource not found") {
    return new ApiError(404, message);
  }

  // 500
  static internal(message = "Internal Server Error") {
    return new ApiError(500, message);
  }
}

export default ApiError;
