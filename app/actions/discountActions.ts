"use server";

import { prisma } from "@/lib/prisma";

export const addPVDiscount = async (appliedProducts, formData: FormData) => {
  console.log(formData.get("name"));
  console.log(formData.get("Discount Value"));
  console.log(formData.get("start-date"));
  console.log(formData.get("end-date"));
  console.log(appliedProducts);
  const name: string = String(formData.get("name"));
  const discountValue = parseFloat(String(formData.get("Discount Value")));
  const startDate = new Date(String(formData.get("start-date")));
  const endDate = new Date(String(formData.get("end-date")));

  const fArr = appliedProducts.map((p) => {
    return { id: p };
  });

  const discount = await prisma.discount.create({
    data: {
      name,
      description: "",
      discountPercentage: discountValue,
      startDate,
      endDate,
      products: {
        connect: fArr,
      },
    },
    include: {
      products: true,
    },
  });

  console.log(discount);
};
