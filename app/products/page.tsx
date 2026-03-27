import CreateProduct from "@/components/products/CreateProduct";
import ProductsList from "@/components/products/ProductsList";
import EditProduct from "@/components/products/EditProduct";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const categories = await prisma.category.findMany();
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  return (
    <div className="flex flex-col flex-1 w-full max-w-7xl mx-auto p-5 gap-6">
      <div>
        <CreateProduct categories={categories} />
      </div>
      <div className="border rounded-lg min-h-[400px] bg-muted/10 p-4">
        <ProductsList products={products} />
        <EditProduct categories={categories} />
      </div>
    </div>
  );
}
