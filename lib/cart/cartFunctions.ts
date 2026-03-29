"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

// export async function getCart() {
//   const { userId } = await auth();

//   if (!userId) return null;

//   const user = await prisma.user.findFirst({
//     where: {
//       clerkId: userId,
//     },
//     select: {
//       id: true,
//     },
//   });

//   if (!user) return null;

//   const cart = await prisma.cart.findFirst({
//     where: {
//       userId: user.id,
//     },
//     include: {
//       items: {
//         include: {
//           product: true,
//         },
//       },
//     },
//   });

//   return cart;
// }


