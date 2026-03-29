import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(
      { categories, message: "Categories fetched successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.error("DB[CATEGORIES_API] ERROR:", err);
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
