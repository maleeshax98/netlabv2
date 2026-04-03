import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  const { id } = await params;

  const today = new Date();
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
    include: {
      category: true,
      discounts: {
        where: {
          startDate: {
            lte: today,
          },
          endDate: {
            gt: today,
          },
        },
        orderBy:{
          createdAt: 'desc'
        }
      },
    },
  });

  console.log(id);

  return NextResponse.json(
    {
      message: "Product Fetched",
      product,
    },
    { status: 200 },
  );
}
