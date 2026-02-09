import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z
    .string({
      required_error: "Missing fields: email",
      invalid_type_error: "Email must be a string",
    })
    .min(1, "Email is required")
    .email("Invalid email address"),

  password: z
    .string({
      required_error: "Missing fields: password",
      invalid_type_error: "Password must be a string",
    })
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});
