"use server";
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

    const response = await fetch(
      `${process.env.BASE_URL}/api/products/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
          stock,
          category,
          images: extraData.images,
          specifications: extraData.specifications,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to create product");
    }

    const data = await response.json();
    console.log(data);
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

    const response = await fetch(
      `${process.env.BASE_URL}/api/products/edit/${extraData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
          stock,
          category,
          images: extraData.images,
          specifications: extraData.specifications,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    const data = await response.json();
    console.log(data);
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
    const response = await fetch(
      `${process.env.BASE_URL}/api/categories/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          slug,
        }),
      },
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      return {
        message: data.message,
        status: "error",
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

export async function getAllCategories() {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/categories`);

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();
    return {
      categories: data.categories,
      status: "success",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Category Fetching faild",
      status: "error",
    };
  }
}

export async function getAllProducts() {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/products`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return {
      products: data.products,
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

export async function getProduct(id: string) {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/products/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return {
      product: data.product,
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
