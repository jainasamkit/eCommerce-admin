import { z } from "zod";

const createProductSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .trim()
    .min(1, "Name is required"),

  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .trim()
    .min(1, "Description is required"),

  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .min(0, "Quantity cannot be negative"),

  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .min(0, "Price cannot be negative"),

  brand: z
    .string({
      invalid_type_error: "Brand must be a string",
    })
    .trim()
    .optional(),

  images: z
    .array(
      z
        .string({
          invalid_type_error: "Image must be a string",
        })
        .url("Image must be a valid URL"),
      {
        invalid_type_error: "Images must be an array",
      }
    )
    .optional(),

  category: z
    .array(
      z
        .string({
          invalid_type_error: "Category must be a string",
        })
        .trim(),
      {
        invalid_type_error: "Category must be an array",
      }
    )
    .optional(),

  discount: z
    .number({
      invalid_type_error: "Discount must be a number",
    })
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot be more than 100")
    .optional(),
});

const updateProductSchema = createProductSchema.partial();

export { createProductSchema, updateProductSchema };
