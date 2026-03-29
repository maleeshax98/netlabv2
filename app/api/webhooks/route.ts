import { prisma } from "@/lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`,
    );

    if (evt.type === "user.created") {
      const { id, email_addresses, first_name, last_name } = evt.data;
      const email = email_addresses[0].email_address;
      const name = `${first_name} ${last_name}`;
      try {
        const user = await prisma.user.create({
          data: {
            clerkId: id,
            email,
            name,
          },
        });
      } catch (err) {
        console.log("Prisma user creation error", err);
        return new Response("Prisma user creation error", { status: 400 });
      }
    }

    if (evt.type === "user.deleted") {
      const { id } = evt.data;
      try {
        const userExists = await prisma.user.findFirst({
          where: {
            clerkId: id,
          },
        });
        if (!userExists) {
          return new Response("User not found", { status: 404 });
        }
        const user = await prisma.user.delete({
          where: {
            id: userExists.id,
          },
        });
      } catch (err) {
        console.log("Prisma user deletion error", err);
        return new Response("Prisma user deletion error", { status: 400 });
      }
    }

    if (evt.type === "user.updated") {
      const { id, email_addresses, first_name, last_name } = evt.data;
      const email = email_addresses[0].email_address;
      const name = `${first_name} ${last_name}`;
      try {
        const userExists = await prisma.user.findFirst({
          where: {
            clerkId: id,
          },
        });
        if (!userExists) {
          return new Response("User not found", { status: 404 });
        }
        const user = await prisma.user.update({
          where: {
            id: userExists.id,
          },
          data: {
            email,
            name,
          },
        });
      } catch (err) {
        console.log("Prisma user update error", err);
        return new Response("Prisma user update error", { status: 400 });
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
