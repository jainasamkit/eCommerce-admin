import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { adminLoginService } from "../services/user.service.js";

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await adminLoginService(
      email,
      password
    );

    res.status(200).json(
      new ApiResponse(200, "Login successful", {
        user,
        accessToken,
        refreshToken,
      })
    );
  } catch (error) {
    if (error.message === "USER_NOT_FOUND") {
      throw ApiError.notFound("User not found");
    }

    if (error.message === "ACCESS_DENIED") {
      throw ApiError.forbidden("Access denied");
    }

    if (error.message === "INVALID_CREDENTIALS") {
      throw ApiError.unauthorized("Invalid credentials");
    }

    if (error.message === "USER_SAVE_FAILED") {
      throw ApiError.internal("Failed to save user");
    }

    throw ApiError.internal("Login failed");
  }
};

export { adminLogin };
