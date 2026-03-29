// app/api/products/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const category = searchParams.get("category");

  const filters: any = {};
  if (search) {
    filters.name = { contains: search, mode: "insensitive" };
  }
  if (category) {
    filters.category = { slug: category };
  }

  try {
    const products = await prisma.product.findMany({
      where: filters,
      include: { category: true },
    });
    return NextResponse.json(
      { products, message: "Products fetched successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("DB[PRODUCTS_API] ERROR:", error);

    return NextResponse.json(
      {
        message: "Something went wrong while fetching products",
      },
      { status: 500 },
    );
  }
}
