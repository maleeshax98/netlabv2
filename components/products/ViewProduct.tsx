import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Product } from "./ProductsList";
import Image from "next/image";
import { Eye } from "lucide-react";

interface ViewProductProps {
  data: Product;
}

const ViewProduct = ({ data }: ViewProductProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Eye className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
          <DialogDescription>Detailed view of {data.name}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="shrink-0">
              {data.images?.[0] ? (
                <Image
                  src={data.images[0]}
                  alt={data.name}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover border w-full sm:w-[200px] h-auto aspect-square"
                  unoptimized
                />
              ) : (
                <div className="w-full sm:w-[200px] aspect-square bg-muted rounded-lg flex items-center justify-center text-sm text-muted-foreground border">
                  No image
                </div>
              )}
            </div>
            <div className="space-y-3 flex-1 w-full">
              <div>
                <h3 className="text-xl font-semibold leading-none mb-1">
                  {data.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {data.category?.name || "Uncategorized"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mt-4">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">Price</span>
                  <span className="font-medium text-base">
                    $
                    {typeof data.price === "number"
                      ? data.price.toFixed(2)
                      : parseFloat(data.price || "0").toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">Stock</span>
                  <span className="font-medium text-base">
                    {data.stock} units
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">
                    Reserved
                  </span>
                  <span className="font-medium text-base">
                    {data.reserved} units
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">
                    Created At
                  </span>
                  <span className="font-medium text-sm">
                    {new Date(data.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold border-b pb-1">Description</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
              {data.description}
            </p>
          </div>

          {data.specifications && data.specifications.length > 0 && (
            <div className="space-y-3 mt-2">
              <h4 className="text-sm font-semibold border-b pb-1">
                Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.specifications.map((spec) => (
                  <div
                    key={spec.id}
                    className="flex flex-col p-2.5 bg-muted/40 rounded-md border border-border/50"
                  >
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {spec.name}
                    </span>
                    <span className="text-sm font-medium mt-0.5">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProduct;
