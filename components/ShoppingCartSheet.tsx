import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart } from "lucide-react";
import CartProductCard from "./products/CartProductCard";

const ShoppingCartSheet = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <div>
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              0
            </span>
          </div>
        </SheetTrigger>
        <SheetContent className=" overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
            <SheetDescription>Your cart items</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 overflow-y-auto p-4">
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
          </div>
          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ShoppingCartSheet;
