import React, { useEffect, useState } from "react";
import ShoppingCartSheet from "./ShoppingCartSheet";
import { useGetCart } from "@/hooks/useGetCart";
import { toast } from "sonner";

const ShoppingCart = () => {
  const { data, loading, error } = useGetCart();
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);


  return (
    <div>
      <ShoppingCartSheet items={data?.items} loading={loading} />
    </div>
  );
};

export default ShoppingCart;
