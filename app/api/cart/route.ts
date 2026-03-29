import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findFirst({
      where: {
        clerkId: clerkId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const cart = await prisma.cart.findFirst({
      where: {
        userId: user.id,
      },
      include: {
        items: {
          orderBy: { updatedAt: "desc" },
          include: {
            product: {
              include: { category: true },
            },
          },
        },
      },
    });

    console.log(cart, "cart");

    if (!cart) {
      const cart = await prisma.cart.upsert({
        where: {
          userId: user.id,
        },
        update: {},
        create: {
          userId: user.id,
        },
        include: {
          items: {
            orderBy: { updatedAt: "desc" },
            include: {
              product: {
                include: { category: true },
              },
            },
          },
        },
      });

      return NextResponse.json(cart, { status: 200 });
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("[CART_GET_FAILURE]", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        detail: error instanceof Error ? error.message : "Unknown",
      },
      { status: 500 },
    );
  }
}
