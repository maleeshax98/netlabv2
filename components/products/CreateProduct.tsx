"use client";

import React, { useState } from "react";
import CreateProductForm from "@/components/products/CreateProductForm";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CreateProduct = ({ categories }: { categories: any[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>

        <Sheet open={open} onOpenChange={setOpen} modal={false}>
          <SheetTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </SheetTrigger>
          <SheetContent
            className="overflow-y-auto sm:max-w-xl md:max-w-2xl w-screen"
            onInteractOutside={(e) => e.preventDefault()}
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Create Product</SheetTitle>
              <SheetDescription>Form to create a new product</SheetDescription>
            </SheetHeader>
            <CreateProductForm categories={categories} setOpen={setOpen} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CreateProduct;
