import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";

const CartProductCard = ({ item }: { item: any }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const { updateCart, isUpdating } = useCart();

  const handleUpdateCart = async (action: string) => {
    await updateCart({
      cartItemId: item.id,
      action,
      productId: item.productId,
    });
  };

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
          <Image
            src={item.product.images[0]}
            alt={"product"}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 ">
          <h3 className="text-sm font-medium">{item.product.name}</h3>
          <p className="text-xs text-muted-foreground">
            {item.product.category.name}
          </p>
          <p className="text-sm font-medium">${item.product.price}</p>
          <div>
            <Button variant="destructive" size="icon">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                handleUpdateCart("decrement");
              }}
              disabled={isUpdating || quantity === 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                handleUpdateCart("increment");
              }}
              disabled={isUpdating || item.product.availableStock <= 0}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
