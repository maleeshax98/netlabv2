"use server";

import { prisma } from "../prisma";

export async function getProducts(search?: string, category?: string) {
  const filters: any = {};

  // Search filter
  if (search?.trim()) {
    filters.name = {
      contains: search.trim(),
      mode: "insensitive",
    };
  }

  // Category filter
  if (category?.trim()) {
    filters.category = {
      slug: category.trim(),
    };
  }

  const products = await prisma.product.findMany({
    where: filters,
    include: {
      category: true,
    },
  });

  return products;
}

export async function getAllCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}
