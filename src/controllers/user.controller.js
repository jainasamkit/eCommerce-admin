import { User } from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new apiError(400, "Email and password are required");
    }
    const user = await User.findOne({ email, role: "admin" });
    if (!user) {
      throw new apiError(404, "Admin not found");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new apiError(401, "Invalid credentials");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();
    res.status(200).json(
      new apiResponse(true, "Login successful", {
        user,
        accessToken,
        refreshToken,
      })
    );
  } catch (error) {
    throw new apiError(500, "Internal Server Error");
  }
};

export { adminLogin };
