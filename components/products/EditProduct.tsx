"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getProduct } from "@/app/actions/productActions";
import EditProductForm from "./EditProductForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const EditProduct = ({ categories }: { categories: any }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const response = await getProduct(id);
        if (response.product) {
          setData(response.product);
          setOpen(true);
        }
      };
      fetchProduct();
    } else {
      setOpen(false);
      setData(null);
    }
  }, [id]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      router.push("/products");
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange} modal={false}>
      <SheetContent
        className="overflow-y-auto sm:max-w-xl md:max-w-2xl w-screen "
        onInteractOutside={(e) => e.preventDefault()}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Edit Product</SheetTitle>
          <SheetDescription>Form to edit product details</SheetDescription>
        </SheetHeader>
        {data && (
          <EditProductForm
            data={data}
            categories={categories}
            setOpen={handleOpenChange}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditProduct;
