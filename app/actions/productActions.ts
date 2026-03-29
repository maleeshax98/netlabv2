"use server";
import { prisma } from "@/lib/prisma";
import { CategorySchema, ProductSchema } from "@/lib/zodSchemas";
import axios from "axios";
import { refresh } from "next/cache";
import slugify from "slugify";
import z from "zod";

export async function createPost(
  extraData: any,
  previousState,
  formData: FormData,
) {
  const name = String(formData.get("name"));
  const description = String(formData.get("description"));
  const price = parseFloat(String(formData.get("price")));
  const stock = parseInt(String(formData.get("stock")));
  const category = String(formData.get("category"));
  const isFeatured = formData.get("isFeatured") === "on";
  const isProductByNET = formData.get("isProductByNET") === "on";
  try {
    const result = ProductSchema.safeParse({
      name,
      description,
      price,
      stock,
      category,
      images: extraData.images,
      specifications: extraData.specifications,
    });

    if (!result.success) {
      return {
        message: result.error.issues[0].message,
        status: "error",
      };
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        categoryId: category,
        images: extraData.images,
        specifications: extraData.specifications,
        reserved: 0,
        isFeatured,
        isProductByNET,
      },
    });

    if (!product) {
      return {
        message: "Product created successfully",
        status: "success",
      };
    }

    refresh();
    return {
      message: "Product created successfully",
      status: "success",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues);
      return {
        message: error.issues[0].message,
        status: "error",
      };
    } else {
      console.log(error);
      return {
        message: "Somthing went wrong",
        status: "error",
      };
    }
  }
}

export async function editProduct(
  extraData: any,
  previousState,
  formData: FormData,
) {
  const name = String(formData.get("name"));
  const description = String(formData.get("description"));
  const price = parseFloat(String(formData.get("price")));
  const stock = parseInt(String(formData.get("stock")));
  const category = String(formData.get("category"));
  const isFeatured = formData.get("isFeatured") === "on";
  const isProductByNET = formData.get("isProductByNET") === "on";
  try {
    const result = ProductSchema.safeParse({
      name,
      description,
      price,
      stock,
      category,
      images: extraData.images,
      specifications: extraData.specifications,
    });

    if (!result.success) {
      return {
        message: result.error.issues[0].message,
        status: "error",
      };
    }
    const productExists = await prisma.product.findUnique({
      where: {
        id: extraData.id,
      },
    });

    if (!productExists) {
      return {
        message: "Product not found",
        status: "error",
      };
    }

    const product = await prisma.product.update({
      where: {
        id: extraData.id,
      },
      data: {
        name,
        description,
        price,
        stock,
        categoryId: category,
        images: extraData.images,
        specifications: extraData.specifications,
        isFeatured,
        isProductByNET,
      },
    });

    if (!product) {
      return {
        message: "Product updated failed",
        status: "error",
      };
    }

    refresh();
    return {
      message: "Product updated successfully",
      status: "success",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues);
      return {
        message: error.issues[0].message,
        status: "error",
      };
    } else {
      console.log(error);
      return {
        message: "Somthing went wrong",
        status: "error",
      };
    }
  }
}

export async function createCategory(previousState, formData: FormData) {
  const name = String(formData.get("name"));
  const slug = slugify(name, {
    lower: true,
    strict: true,
    locale: "en",
    replacement: "-",
  });
  const result = CategorySchema.safeParse({ name, slug });

  if (!result.success) {
    return {
      message: result.error.issues[0].message,
      status: "error",
    };
  }

  try {
    const category = await prisma.category.create({
      data: {
        name,
        slug,
      },
    });

    if (!category) {
      return {
        message: "Category created successfully",
        status: "success",
      };
    }

    refresh();

    return {
      message: "Category created successfully",
      status: "success",
    };
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return {
        message: error.issues[0].message,
        status: "error",
      };
    } else {
      return {
        message: "Category created faild",
        status: "error",
      };
    }
  }
}

// export async function getAllCategories() {
//   try {
//     const response = await fetch(`${process.env.BASE_URL}/api/categories`);

//     if (!response.ok) {
//       throw new Error("Failed to fetch categories");
//     }

//     const data = await response.json();
//     return {
//       categories: data.categories,
//       status: "success",
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       message: "Category Fetching faild",
//       status: "error",
//     };
//   }
// }

// export async function getAllProducts() {
//   try {
//     const response = await fetch(`${process.env.BASE_URL}/api/products`);

//     if (!response.ok) {
//       throw new Error("Failed to fetch products");
//     }

//     const data = await response.json();
//     return {
//       products: data.products,
//       status: "success",
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       message: "Product Fetching faild",
//       status: "error",
//     };
//   }
// }

export async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new Error("Failed to fetch products");
    }

    return {
      product,
      status: "success",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Product Fetching faild",
      status: "error",
    };
  }
}

export async function deleteProduct(prev: any, id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new Error("Failed to fetch products");
    }

    const deleteProduct = await prisma.product.delete({
      where: {
        id,
      },
    });

    if (!deleteProduct) {
      return {
        message: "Product deletion faild",
        status: "error",
      };
    }

    refresh();

    return {
      message: "Product deleted successfully",
      status: "success",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Product Fetching faild",
      status: "error",
    };
  }
}

export async function getFeaturedCategories() {
  const catos = await prisma.category.findMany({
    include: {
      products: {
        take: 4,
        include: {
          category: true,
        },
      },
    },
    take: 6,
  });

  return catos;
}
