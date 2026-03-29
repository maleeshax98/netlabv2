"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function addToCart(prev: any, productId: string) {
  try {
    const { isAuthenticated, redirectToSignIn, userId } = await auth();

    if (!isAuthenticated) return redirectToSignIn();

    const user = await prisma.user.findFirst({
      where: {
        clerkId: userId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return {
        message: "User not found",
        status: "error",
      };
    }

    const id = user.id;

    const cartExists = await prisma.cart.findFirst({
      where: {
        userId: id,
      },
    });

    if (cartExists) {
      const productExists = await prisma.cart.findFirst({
        where: {
          userId: id,
          items: {
            some: {
              productId: productId,
            },
          },
        },
        include: {
          items: {
            where: {
              productId: productId,
            },
          },
        },
      });

      if (productExists) {
        const incrementProduct = await prisma.cart.update({
          where: {
            id: cartExists?.id,
            userId: id,
          },
          data: {
            items: {
              update: {
                where: {
                  id: productExists?.items[0].id,
                  productId: productId,
                },
                data: {
                  quantity: {
                    increment: 1,
                  },
                },
              },
            },
          },

          include: {
            items: true,
          },
        });

        return {
          message: "Product added to cart",
          status: "success",
        };
      } else {
        const addProductToCart = await prisma.cart.update({
          where: {
            id: cartExists?.id,
            userId: id,
          },
          data: {
            items: {
              create: [{ productId: productId, quantity: 1 }],
            },
          },
          include: {
            items: true,
            user: true,
          },
        });

        return {
          message: "Product added to cart",
          status: "success",
        };
      }
    } else {
      const createCart = await prisma.cart.create({
        data: {
          userId: id,
          items: {
            create: [{ productId: productId, quantity: 1 }],
          },
        },
        include: {
          items: true,
          user: true,
        },
      });

      return {
        message: "Product added to cart",
        status: "success",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      message: "Somthing Went Wrong!",
      status: "error",
    };
  }
}
