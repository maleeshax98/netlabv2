import { Navbar } from "@/components/home/navbar";
import { PromotionalHero } from "@/components/home/promotional-hero";
import React from "react";
import Test from "@/components/home/test";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { FaqSection } from "@/components/home/faq-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import ExclusiveSection from "@/components/home/exclusive-section";

const page = () => {
  return (
    <main className="flex flex-col flex-1 w-full max-w-7xl mx-auto p-5 gap-6">
      <div>
        <Navbar />
        <PromotionalHero />
        <FeaturedProducts />
        <TestimonialsSection />
        <ExclusiveSection />
        <CategoryShowcase />
        <FaqSection />
      </div>
    </main>
  );
};

export default page;
