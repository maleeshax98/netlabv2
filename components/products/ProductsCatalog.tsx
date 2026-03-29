"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react"; // Icons for industrial feel
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "../home/product-card";
import { Separator } from "@/components/ui/separator";
import { Label } from "../ui/label";

const ProductsCatalog = ({
  categories,
  allProducts,
  search: initialSearch,
  category: initialCategory,
  loadingProducts,
}: {
  categories: any[];
  allProducts: any[];
  search: string;
  category: string;
  loadingProducts: boolean;
}) => {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch || "");
  const [category, setCategory] = useState(initialCategory || "");

  useEffect(() => {
    const params = new URLSearchParams();
    if (search?.trim()) params.set("search", search.trim());
    if (category?.trim()) params.set("category", category.trim());

    const queryString = params.toString();
    const url = queryString ? `/products?${queryString}` : "/products";
    router.push(url);
  }, [search, category, router]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Catalog</h1>
          <p className="text-muted-foreground mt-1">
            Showing {allProducts.length} products
          </p>
        </div>
      </div>

      <div className="flex flex-col  gap-10">
        <aside className="w-full lg:w-64 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </div>
            <Separator />

            <div className="flex flex-col md:flex-row flex-wrap md:items-center gap-5">
              <div className="flex-1 space-y-2">
                <div className="flex gap-1 items-center">
                  <Search className="h-4 w-4  text-muted-foreground" />
                  <Label className="text-sm font-medium bg-amber-600 text-pink-600">
                    Search
                  </Label>
                </div>
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="flex-1 space-y-2">
                <Label className="text-sm font-medium">Category</Label>
                <Select onValueChange={(e) => setCategory(e)}>
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value=" ">All Products</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.slug}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          {loadingProducts ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed rounded-xl">
              <p className="text-muted-foreground font-medium text-lg">
                Loading products...
              </p>
            </div>
          ) : !loadingProducts && allProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed rounded-xl">
              <p className="text-muted-foreground font-medium text-lg">
                No products found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("");
                }}
                className="mt-4 text-primary text-sm underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {allProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsCatalog;
