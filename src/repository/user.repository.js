import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("USER_NOT_FOUND");
    throw error;
  }

  return user;
};

const findUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    const error = new Error("USER_NOT_FOUND");
    throw error;
  }

  return user;
};

const saveUser = async (user) => {
  try {
    await user.save();
    return user;
  } catch (error) {
    throw new Error("USER_SAVE_FAILED");
  }
};

export { findUserByEmail, findUserById, saveUser };
