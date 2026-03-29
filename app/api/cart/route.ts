import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized: No user logged in" },
      { status: 401 },
    );
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        clerkId: userId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found in database" },
        { status: 404 },
      );
    }

    const cart = await prisma.cart.findFirst({
      where: {
        userId: user.id,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      { cart, message: "Cart fetched successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("DB[CART_API] ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch cart" },
      { status: 500 },
    );
  }
}
