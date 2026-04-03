"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useProduct = (id: string) => {
  const getProduct = async (id: string) => {
    const res = await axios.get(`/api/products/${id}`);
    return res.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    staleTime: 2000,
    retry: 1,
  });

  return { data, loadingProduct: isLoading, productFetchError: error };
};

export default useProduct;
