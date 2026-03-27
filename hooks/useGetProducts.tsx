"use client";
import { useState, useEffect } from "react";

export const useGetProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.BASE_URL}/api/products`);

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();

        setData(data.products);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, []);

  return { data, loading, error };
};
