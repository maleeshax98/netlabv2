"use client";
import { addToCart, updateCart } from "@/app/actions/cartActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCart = () => {
  const queryClient = useQueryClient();

  const getCart = async () => {
    const res = await axios.get("/api/cart");
    return res.data;
  };

  const {
    data: cart,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const mutation = useMutation({
    mutationFn: (data: {
      cartItemId: string;
      action: string;
      productId: string;
    }) => updateCart(data),
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["cart"] }),
        queryClient.invalidateQueries({ queryKey: ["products"] }),
      ]);

      console.log(data);
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: (productId: string) => addToCart(productId),
    onSuccess: async () => {
      console.log("Added to cart DB");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["cart"] }),
        queryClient.invalidateQueries({ queryKey: ["products"] }),
      ]);
    },
  });

  return {
    cart,
    isLoading,
    cartFetchError: error,

    updateCart: mutation.mutateAsync,
    isUpdating: mutation.isPending,

    addToCart: addToCartMutation.mutateAsync,
    isAddingToCart: addToCartMutation.isPending,
  };
};
