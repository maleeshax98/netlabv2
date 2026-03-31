import React, { useEffect, useState } from "react";
import ShoppingCartSheet from "./ShoppingCartSheet";
import { useGetCart } from "@/hooks/useGetCart";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";

const ShoppingCart = () => {
  const { cart, isLoading } = useCart();

  return (
    <div>
      <ShoppingCartSheet items={cart?.items || []} loading={isLoading} />
    </div>
  );
};

export default ShoppingCart;
