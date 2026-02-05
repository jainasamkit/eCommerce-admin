import { User } from "../models/user.model.js";

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error("Error finding user by email");
  }
};

const findUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error("Error finding user by ID");
  }
};

export { findUserByEmail, findUserById };
