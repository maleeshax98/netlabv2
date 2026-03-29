"use client";

import { useSearchParams } from "next/navigation";
import ProductsCatalog from "@/components/products/ProductsCatalog";
import { useEffect, useState } from "react";
import { useGetProducts } from "@/hooks/useGetProducts";
import { toast } from "sonner";
import { useGetCategories } from "@/hooks/useGetCategories";

export default function ProductsPage() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const category = searchParams.get("category");

  const {
    data: products,
    loading: loadingProducts,
    error,
  } = useGetProducts(search, category);

  const {
    data: categories,
    loading: loadingCategories,
    error: categoriesError,
  } = useGetCategories();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex flex-col flex-1 w-full max-w-7xl mx-auto p-5 gap-6">
      {/* Catalog Component */}
      <div className="">
        <ProductsCatalog
          allProducts={products ? products : []}
          search={search || ""}
          category={category || ""}
          categories={categories ? categories : []}
          loadingProducts={loadingProducts}
        />
      </div>
    </div>
  );
}
