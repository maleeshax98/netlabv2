import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useProducts } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

const DiscountProductsDialog = ({ appliedProducts, setAppliedProducts }) => {
  const { products, loadingProducts, productsFetchError } = useProducts("", "");
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="p-5" type="button">Select Products</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Products</DialogTitle>
            <DialogDescription>
              Select products to apply the discount to
              <div>
                {loadingProducts ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  products.products.map((product) => (
                    <div
                      key={product.id}
                      className="my- bg-gray-200/20 p-3 rounded-md my-2"
                    >
                      <div className="flex justify-between items-center ">
                        <div className="flex items-center gap-2 font-semibold">
                          <Image
                            src={product.images[0]}
                            width={50}
                            height={50}
                            alt={product.name}
                            className="rounded-lg"
                          />
                          <p>{product.name}</p>
                        </div>
                        <Switch
                          checked={appliedProducts.includes(product.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setAppliedProducts([
                                ...appliedProducts,
                                product.id,
                              ]);
                            } else {
                              setAppliedProducts(
                                appliedProducts.filter(
                                  (id) => id !== product.id,
                                ),
                              );
                            }
                          }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiscountProductsDialog;
