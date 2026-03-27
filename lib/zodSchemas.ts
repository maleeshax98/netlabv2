import z from "zod";

const ProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  price: z.number().min(0, "Price must be at least 0"),
  stock: z.number().min(0, "Stock must be at least 0"),
  category: z.string().min(1, "Category is required"),
  images: z.array(z.string()).min(1, "Images are required"),
  specifications: z
    .array(
      z.object({
        name: z.string().min(1, "Title is required"),
        value: z.string().min(1, "Value is required"),
      }),
    )
    .optional(),
});

const CategorySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  slug: z.string().min(3, "Slug must be at least 3 characters long"),
});

export { ProductSchema, CategorySchema };
