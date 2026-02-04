import { User } from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
const createAdmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      throw new apiError(400, "Email, password and name are required");
    }

    const existingAdmin = await User.findOne({ email, role: "admin" });
    if (existingAdmin) {
      throw new apiError(400, "Email is already registered as admin");
    }

    const newAdmin = new User({
      email,
      password,
      name,
      role: "admin",
    });
    await newAdmin.save();

    res
      .status(201)
      .json(new apiResponse(true, "Admin created successfully", newAdmin));
  } catch (error) {
    throw new apiError(500, "Internal Server Error");
  }
};

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

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new apiError(401, "Invalid credentials");
    }
    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    // Save refresh token to user document
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

export { createAdmin, adminLogin };
