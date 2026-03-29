"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { refresh, revalidatePath } from "next/cache";

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

    // if (cartExists) {
    //   const productExists = await prisma.cart.findFirst({
    //     where: {
    //       userId: id,
    //       items: {
    //         some: {
    //           productId: productId,
    //         },
    //       },
    //     },
    //     include: {
    //       items: {
    //         where: {
    //           productId: productId,
    //         },
    //       },
    //     },
    //   });

    //   if (productExists) {
    //     const incrementProduct = await prisma.cart.update({
    //       where: {
    //         id: cartExists?.id,
    //         userId: id,
    //       },
    //       data: {
    //         items: {
    //           update: {
    //             where: {
    //               id: productExists?.items[0].id,
    //               productId: productId,
    //             },
    //             data: {
    //               quantity: {
    //                 increment: 1,
    //               },
    //             },
    //           },
    //         },
    //       },

    //       include: {
    //         items: true,
    //       },
    //     });

    //     return {
    //       message: "Product added to cart",
    //       status: "success",
    //     };
    //   } else {
    //     const addProductToCart = await prisma.cart.update({
    //       where: {
    //         id: cartExists?.id,
    //         userId: id,
    //       },
    //       data: {
    //         items: {
    //           create: [{ productId: productId, quantity: 1 }],
    //         },
    //       },
    //       include: {
    //         items: true,
    //         user: true,
    //       },
    //     });

    //     return {
    //       message: "Product added to cart",
    //       status: "success",
    //     };
    //   }
    // } else {
    //   const createCart = await prisma.cart.create({
    //     data: {
    //       userId: id,
    //       items: {
    //         create: [{ productId: productId, quantity: 1 }],
    //       },
    //     },
    //     include: {
    //       items: true,
    //       user: true,
    //     },
    //   });

    //   return {
    //     message: "Product added to cart",
    //     status: "success",
    //   };
    // }

    const [cart, product] = await prisma.$transaction([
      prisma.cart.upsert({
        where: {
          userId: id,
        },
        create: {
          userId: id,
          items: {
            create: {
              productId,
              quantity: 1,
            },
          },
        },
        update: {
          items: {
            upsert: {
              where: {
                cartId_productId: {
                  cartId:
                    (
                      await prisma.cart.findUnique({
                        where: { userId: user.id },
                        select: { id: true },
                      })
                    )?.id || "",
                  productId,
                },
              },
              update: {
                quantity: { increment: 1 },
              },
              create: {
                productId,
                quantity: 1,
              },
            },
          },
        },
      }),

      prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          reserved: {
            increment: 1,
          },
          availableStock: {
            decrement: 1,
          },
        },
      }),
    ]);

    refresh();

    if (cart) {
      return {
        message: "Product added to cart",
        status: "success",
      };
    }

    return {
      message: "Somthing Went Wrong!",
      status: "error",
    };
  } catch (err) {
    console.log(err);
    return {
      message: "Somthing Went Wrong!",
      status: "error",
    };
  }
}

export async function updateCart(
  prev: any,
  data: {
    cartItemId: string;
    action: string;
    productId: string;
  },
) {
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

    const userCart = await prisma.cart.findUnique({
      where: {
        userId: id,
      },
      include: {
        items: {
          where: {
            id: data.cartItemId,
          },
        },
      },
    });

    if (!userCart) {
      return {
        message: "Cart not found",
        status: "error",
      };
    }

    const [cartItem, product] = await prisma.$transaction([
      prisma.cartItem.upsert({
        where: {
          id: data.cartItemId,
        },
        update: {
          quantity: {
            increment: data.action === "increment" ? 1 : -1,
          },
        },
        create: {
          cartId: userCart.id,
          productId: data.productId,
          quantity: 1,
        },
        include: {
          cart: true,
        },
      }),
      prisma.product.update({
        where: {
          id: data.productId,
        },
        data: {
          reserved: {
            increment: data.action === "increment" ? 1 : -1,
          },
          availableStock: {
            decrement: data.action === "increment" ? 1 : -1,
          },
        },
      }),
    ]);

    console.log(cartItem);
    refresh();
    revalidatePath("/api/cart");
    if (cartItem) {
      return {
        message: "Cart updated successfully",
        status: "success",
      };
    }

    return {
      message: "Somthing Went Wrong!",
      status: "error",
    };
  } catch (err) {
    console.log(err);
    return {
      message: "Somthing Went Wrong!",
      status: "error",
    };
  }
}
