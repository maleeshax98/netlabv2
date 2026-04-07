import React from "react";
import { ProductCard } from "../home/product-card";

const FeaturedProductsSection = ({ featuredProducts }) => {
  return (
    <div className="">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">Reccomanded Products</h1>
        <p className="text-gray-500">Based on your projects</p>
      </div>
      <div className="flex gap-2">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProductsSection;
