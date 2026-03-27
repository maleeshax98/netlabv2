import { useState, useEffect } from "react";

export const useGetProduct = (id: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.BASE_URL}/api/products/${id}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  return { data, loading, error };
};
