import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { adminLoginService } from "../services/adminlogin.service.js";
const adminLogin = async (req, res) => {
  try {
    console.log("Admin login attempt:", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      throw new apiError(400, "Email and password are required");
    }
    const { user, accessToken, refreshToken } = await adminLoginService(
      email,
      password
    );

    res.status(200).json(
      new apiResponse(200, "Login successful", {
        user,
        accessToken,
        refreshToken,
      })
    );
  } catch (error) {
    throw new apiError(
      error.statusCode || 500,
      error.message || "Login failed"
    );
  }
};

export { adminLogin };
