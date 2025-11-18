import z from "zod";
import { categories } from "../../data/data";

export const schema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(120, "Name must be at most 120 characters"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(500, "Description must be at most 500 characters"),
    price: z.number({
       error : "price is required"
     }).min(0.01, "price must be greater than 0"),
    category: z.enum(categories.map((c) => c.name)),
    quantity: z
      .number({
        error: "Quantity must be a number",
      })
      .int("Quantity must be a whole number")
      .min(0, "Quantity must be at least 0"),
    image: z
      .instanceof(File)
      .optional()
      .refine(
        (file) => !file || file.size <= 5 * 1024 * 1024,
        "Image must be less than 5MB"
      )
      .refine(
        (file) =>
          !file ||
          ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(
            file.type
          ),
        "Only JPEG, PNG, and WebP images are allowed"
      ),
  })
  .refine((data) => data.quantity >= 0, {
    message: "Quantity must be a non-negative number",
    path: ["quantity"],
  });

export type EditProductType = z.infer<typeof schema>;
