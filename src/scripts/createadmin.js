import { User } from "../models/user.model.js";
import connectDB from "../config/db.js";
const [, , email, password, name = "Admin User"] = process.argv;

if (!email || !password) {
  console.error("Usage: node createAdmin.js <email> <password> [name]");
  process.exit(1);
}

const run = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ email, role: "admin" });
    if (existingAdmin) {
      console.error("Admin already exists with this email");
      process.exit(1);
    }

    const admin = await User.create({
      email,
      password,
      name,
      role: "admin",
    });

    console.log(`Admin created: ${admin.email}`);
    process.exit(0);
  } catch (err) {
    console.error("Failed to create admin:", err);
    process.exit(1);
  }
};

run();
