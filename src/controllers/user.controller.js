import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { adminLoginService } from "../services/adminlogin.service.js";
const adminLogin = async (req, res) => {
  try {
    console.log("Admin login attempt:", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      throw ApiError.badRequest("Email and password are required");
    }
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
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Login failed"
    );
  }
};

export { adminLogin };
