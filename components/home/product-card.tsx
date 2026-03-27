"use client";

import Image from "next/image";
import { ShoppingCart, Eye, PackageCheck, PackageX } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProductCard({ product }) {
  // const discountedPrice =
  //   product.isOnSale && product.discount
  //     ? product.price * (1 - product.discount / 100)
  //     : product.price;

  const discountedPrice = product.price;

  const isOutOfStock = product.stock - product.reserved === 0;

  return (
    <Card className="group relative overflow-hidden rounded-2xl border-none bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
      {/* Badges */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-2 font-sans">
        {/* {product.isNew && (
          <Badge className="bg-primary hover:bg-primary px-3 py-1 font-bold text-[10px] uppercase tracking-wider">
            New
          </Badge>
        )} */}
        {/* {product.isOnSale && (
          <Badge
            variant="destructive"
            className="px-3 py-1 font-bold text-[10px] uppercase tracking-wider"
          >
            -{product.discount}%
          </Badge>
        )} */}
      </div>

      {/* Image Container */}
      <CardContent className="p-3 overflow-hidden aspect-square relative">
        <div className="relative h-full w-full overflow-hidden rounded-xl bg-muted/30 transition-colors duration-300 flex items-center justify-center">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 rounded-xl"
          />

          {/* Availability Overlay (Small) */}
          <div className="absolute bottom-2 right-2">
            {isOutOfStock ? (
              <Badge
                variant="outline"
                className="bg-background/80 backdrop-blur-sm text-destructive border-destructive/20 text-[10px] px-2 py-0"
              >
                <PackageX className="h-3 w-3 mr-1" /> Out of stock
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-background/80 backdrop-blur-sm text-emerald-500 border-emerald-500/20 text-[10px] px-2 py-0"
              >
                <PackageCheck className="h-3 w-3 mr-1" />{" "}
                {product.stock - product.reserved} in stock
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      {/* Product Details */}
      <CardFooter className="flex flex-col items-start gap-4 p-5 pt-2 bg-background/40 backdrop-blur-md">
        <div className="space-y-1 w-full font-sans">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
            {product.category.name}
          </p>
          <h3 className="font-bold text-lg tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center justify-between font-sans">
            {/* {product.isOnSale ? (
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tighter text-primary">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground/50 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-black tracking-tighter text-foreground">
                ${product.price.toFixed(2)}
              </span>
            )} */}
            <span className="text-xl font-black tracking-tighter text-foreground">
              Rs.{product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex gap-2 w-full font-sans">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 rounded-lg font-bold gap-2 text-xs p-5"
            >
              <Eye className="h-4 w-4" /> Quick View
            </Button>
            <Button
              size="sm"
              disabled={isOutOfStock}
              className="flex-1 rounded-lg font-bold gap-2 text-xs shadow-lg shadow-primary/10 p-5"
            >
              <ShoppingCart className="h-4 w-4" /> Add
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
