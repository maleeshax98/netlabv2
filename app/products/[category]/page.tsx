import ProductsCatalog from "@/components/products/ProductsCatalog";
import { prisma } from "@/lib/prisma";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "All Products | NET.",
  description:
    "Browse our complete catalog of precision electronic components.",
};

export default async function ProductsPage() {
  const allProducts = await prisma.product.findMany({
    include: {
      category: true,
    },
  });
  return (
    <div className="flex flex-col flex-1 w-full max-w-7xl mx-auto p-5 gap-6">
      {/* Catalog Component */}
      <h1>Category</h1>
      <div className="">
        <ProductsCatalog allProducts={allProducts} />
      </div>
    </div>
  );
}
