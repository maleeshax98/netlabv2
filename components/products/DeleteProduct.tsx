"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Product } from "./ProductsList";
import Image from "next/image";
import { AlertCircleIcon, DeleteIcon, Eye } from "lucide-react";
import { Button } from "../ui/button";
import { useActionState, useEffect, startTransition } from "react";
import { deleteProduct } from "@/app/actions/productActions";
import { toast } from "sonner";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

interface DeleteProductProps {
  data: Product;
}

const DeleteProduct = ({ data }: DeleteProductProps) => {
  
  const [state, dispatchAction, isPending] = useActionState(deleteProduct, {
    status: "",
    message: "",
  });

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message, { position: "top-center" });
    }

    if (state.status === "error") {
      toast.error(state.message, { position: "top-center" });
    }
  }, [state]);

  const del = async () => {
    startTransition(() => {
      if (data.id) {
        dispatchAction(data.id);
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DeleteIcon className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>Delete Product {data.name}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="my-4">
            {state.status === "error" && (
              <Alert variant="destructive" className="max-w-md">
                <AlertCircleIcon />
                <AlertTitle>Product Creation Faild</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <Button
              onClick={() => {
                del();
              }}
              disabled={isPending}
              variant="destructive"
            >
              {isPending ? "Deleting..." : "Confirm and delete product"}
            </Button>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProduct;
