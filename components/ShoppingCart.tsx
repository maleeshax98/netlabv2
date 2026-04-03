import React, { useEffect, useState } from "react";
import ShoppingCartSheet from "./ShoppingCartSheet";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

const ShoppingCart = () => {
  const { cart, isLoading, cartFetchError } = useCart();

  useEffect(() => {
    if (cartFetchError) {
      toast.error(cartFetchError.message);
    }
  }, [cartFetchError]);

  return (
    <div>
      <ShoppingCartSheet items={cart?.items || []} loading={isLoading} />
    </div>
  );
};

export default ShoppingCart;
