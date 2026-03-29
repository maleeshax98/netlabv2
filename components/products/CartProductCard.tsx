import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";

const CartProductCard = () => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
          <Image
            src={"/default.png"}
            alt={"product"}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium">{"product.name"}</h3>
          <p className="text-xs text-muted-foreground">{"product.category"}</p>
          <p className="text-sm font-medium">${"product.price"}</p>
          <div className="flex items-center gap-2 mt-2">
            <Button variant="outline" size="icon">
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">1</span>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <Button variant="ghost" size="icon">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
