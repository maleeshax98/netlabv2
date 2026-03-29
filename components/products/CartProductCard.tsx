import Image from "next/image";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { updateCart } from "@/app/actions/cartActions";
import { toast } from "sonner";

const CartProductCard = ({ item }: { item: any }) => {
  console.log(item);

  const [quantity, setQuantity] = useState(item.quantity);

  const [state, dispatchAction, isPending] = useActionState(updateCart, {
    status: "",
    message: "",
  });

  const updateCartFunc = async (action: string) => {
    startTransition(() => {
      if (item.id) {
        dispatchAction({
          cartItemId: item.id,
          action,
          productId: item.productId,
        });
      }
    });
  };

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message, { position: "top-center" });
    }

    if (state.status === "error") {
      toast.error(state.message, { position: "top-center" });
    }
  }, [state, isPending]);

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
              disabled={isPending}
              onClick={() => {
                updateCartFunc("decrement");
                setQuantity(quantity - 1);
              }}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              disabled={isPending}
              onClick={() => {
                updateCartFunc("increment");
                setQuantity(quantity + 1);
              }}
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
