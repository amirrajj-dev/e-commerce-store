import z from "zod";
import { categories } from "../../data/data";

export const schema = z.object({
  name: z
    .string()
    .min(1, "name is required")
    .max(120, "name must be at most 120 characters"),
  description: z
    .string()
    .min(1, "description is required")
    .max(500, "description must be at most 500 characters"),
  price: z.number({
    error : "price is required"
  }).min(0.01, "price must be greater than 0"),
  category: z.enum(categories.map((c) => c.name)),
  quantity: z.number({
    error : "quantity is required"
  }).min(1, "quantity must be at least 1"),
  image: z
    .instanceof(File , {
      error : "image is required"
    })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Image must be less than 5MB"
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPEG, PNG, and WebP images are allowed"
    )
});

export type CreateProductType = z.infer<typeof schema>;
