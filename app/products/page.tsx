"use client";

import { useSearchParams } from "next/navigation";

import ProductsCatalog from "@/components/products/ProductsCatalog";
import { prisma } from "@/lib/prisma";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAllCategories,
  getProducts,
} from "@/lib/products/productsFunctions";
import { Navbar } from "@/components/home/navbar";
import { Input } from "@/components/ui/input";

export default function ProductsPage() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const category = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getAllCategories();
      setCategories(categories);
    };
    fetchCategories();
    const fetchProducts = async () => {
      const products = await getProducts(search || "", category || "");
      setProducts(products);
    };
    fetchProducts();
  }, [search, category]);

  console.log(products);
  return (
    <div className="flex flex-col flex-1 w-full max-w-7xl mx-auto p-5 gap-6">
      {/* Catalog Component */}
      <Navbar />
      <div className="">
        <ProductsCatalog
          allProducts={products}
          search={search}
          category={category}
          categories={categories}
        />
      </div>
    </div>
  );
}
