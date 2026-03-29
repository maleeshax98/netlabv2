"use client";
import { fetchAPI } from "@/lib/fetch";
import { useState, useEffect } from "react";

export const useGetCategories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchAPI(`/api/categories`);

        setData(result.categories);
      } catch (err: any) {
        console.error(err);

        setError(err?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
