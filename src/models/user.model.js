import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  ACCESS_SECRET,
  ACCESS_EXPIRY,
  REFRESH_SECRET,
  REFRESH_EXPIRY,
} from "../config/env.js";
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    profilePic: { type: String },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (pswd) {
  // Implement password comparison logic (e.g., using bcrypt)
  return bcrypt.compare(pswd, this.password); // Placeholder logic
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  // next();
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    ACCESS_SECRET,
    {
      expiresIn: ACCESS_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    REFRESH_SECRET,
    {
      expiresIn: REFRESH_EXPIRY,
    }
  );
};

export const User = model("user", userSchema);
