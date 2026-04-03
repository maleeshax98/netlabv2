"use client";
import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  Truck,
  RefreshCcw,
  ShoppingCart,
  Heart,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils"; // Standard shadcn utility for conditional classes
import useProduct from "@/hooks/useProduct";
import { ProductDetailsSkeleton } from "./ProductDetailsSkelton";
import { useCart } from "@/hooks/useCart";

// Industrial Data Structure
const PRODUCT_IMAGES = [
  {
    id: "img-1",
    url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
    alt: "Front view of classic black leather jacket",
  },
  {
    id: "img-2",
    url: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=800&auto=format&fit=crop",
    alt: "Back detail of leather jacket texture",
  },
  {
    id: "img-3",
    url: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop",
    alt: "Model wearing leather jacket lifestyle shot",
  },
  {
    id: "img-4",
    url: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=800&auto=format&fit=crop",
    alt: "Close up of zipper and hardware details",
  },
];

const ProductDetails = ({ id, category }: { id: string; category: string }) => {
  const { data, loadingProduct, productFetchError } = useProduct(id);
  const { addToCart, isAddingToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (data) {
      setProduct(data.product);
      setMainImage(data.product.images[0]);
    }
  }, [data]);

  if (loadingProduct && !data && !product) {
    return (
      <div>
        <ProductDetailsSkeleton />
      </div>
    );
  }

  if (productFetchError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{productFetchError.message}</p>
      </div>
    );
  }

  console.log(data);

  const handleAddToCart = async () => {
    await addToCart(product.id);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* LEFT COLUMN: Image Gallery */}
      <section className="space-y-4">
        {/* Hero Image Container */}
        <div className="aspect-[4/5] bg-[#F3F3F3] rounded-sm overflow-hidden border border-zinc-100">
          <img
            src={mainImage}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        </div>

        {/* Thumbnails Grid */}
        <div className="grid grid-cols-4 gap-4">
          {product?.images.map((image) => (
            <button
              key={image}
              onClick={() => setMainImage(image)}
              className={cn(
                "aspect-square bg-[#F3F3F3] overflow-hidden transition-all border-2 rounded-md",
                mainImage === image
                  ? ""
                  : "border-transparent hover:opacity-80",
              )}
            >
              <img src={image} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* RIGHT COLUMN: Product Details */}
      <section className="flex flex-col">
        {/* <nav className="flex items-center text-sm text-muted-foreground mb-4">
          <span>Fashion</span> <ChevronRight className="w-4 h-4 mx-1" />
          <span>Menswear</span> <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-foreground font-medium">
            Classic leather jacket
          </span>
        </nav> */}

        <div className=" mb-4 ">
          <h1 className="text-4xl font-bold tracking-tightuppercase">
            {product?.name}
          </h1>
          <span className="text-muted-foreground text-sm font-medium opacity-50">
            {product?.category?.name}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center  border px-2 py-1 rounded gap-1 text-sm font-bold">
            <span>4.3</span>
            <span className=" text-lg">★</span>
          </div>
          <span className="text-muted-foreground text-sm font-medium">
            210 Reviews
          </span>
        </div>

        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-3xl font-bold">Rs. {product?.price}</span>
          <span className="text-muted-foreground line-through text-lg">
            $599.00
          </span>
          <Badge className="bg-green-600 hover:bg-green-600 text-white border-none rounded-full">
            20% OFF
          </Badge>
        </div>

        <p className="leading-relaxed mb-8 max-w-prose">
          {product?.description}
        </p>

        <Separator className="mb-2" />

        <div className="mb-5">
          <Badge className="bg-green-600/20  text-green-600 border-none rounded-full">
            {product?.availableStock} left in stock
          </Badge>
        </div>
        <div className="flex gap-4 mb-8">
          <Button
            className="flex-[2] h-14 text-lg rounded-md cursor-pointer hover:bg-blue-700"
            onClick={() => {
              handleAddToCart();
            }}
          >
            {isAddingToCart ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 w-5 h-5" /> Add to Cart
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-14 text-lg border-zinc-300 rounded-md"
          >
            <Heart className="mr-2 w-5 h-5" /> Wish List
          </Button>
        </div>

        {/* Value Proposition Box */}
        <div className="border  rounded-md divide-y divide">
          <div className="p-4 flex gap-4 items-center">
            <Truck className="w-5 h-5 " />
            <div>
              <p className="text-sm font-bold">Free Shipping & Returns</p>
              <p className="text-xs text-muted-foreground">
                On all orders over $150
              </p>
            </div>
          </div>
          <div className="p-4 flex gap-4 items-center">
            <RefreshCcw className="w-5 h-5 t" />
            <div>
              <p className="text-sm font-bold">30-Day Guarantee</p>
              <p className="text-xs text-muted-foreground">
                Easy, no-questions-asked returns
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h1 className="text-2xl font-bold tracking-tightuppercase">
          Product Specifications
        </h1>
        <div className="grid grid-cols-2 gap-4 my-5">
          {product?.specifications.map((spec) => (
            <div key={spec.id} className="flex gap-4 items-center">
              <p className="text-sm font-bold">{spec.name}</p>
              <p className="text-xs text-muted-foreground">{spec.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
