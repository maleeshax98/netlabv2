"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProducts = (search: string, category: string) => {
  const getProducts = async (search: string, category: string) => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category) params.append("category", category);
    const res = await axios.get(`/api/products?${params.toString()}`);
    return res.data;
  };

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", search, category],
    queryFn: () => getProducts(search, category),
  });

  return { products, loadingProducts: isLoading, productsFetchError: error };
};
