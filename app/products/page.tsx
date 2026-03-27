import CreateProduct from "@/components/products/CreateProduct";
import { getAllCategories, getAllProducts } from "@/app/actions/productActions";
import ProductsList from "@/components/products/ProductsList";
import EditProduct from "@/components/products/EditProduct";

export default async function ProductsPage() {
  const categories = await getAllCategories();
  const response = await getAllProducts();
  const products = response?.products || [];

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
