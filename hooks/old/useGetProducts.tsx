"use client";
import { fetchAPI } from "@/lib/fetch";
import { useState, useEffect } from "react";

export const useGetProducts = (search, category) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (category) params.append("category", category);

        // const response = await fetch(`/api/products?${params.toString()}`);

        // const result = await response.json();
        const result = await fetchAPI(`/api/products?${params.toString()}`);

        setData(result.products);
      } catch (err: any) {
        console.error(err);

        setError(err?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, category]);

  return { data, loading, error };
};
