"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featuredProducts, Product } from "@/constants/products";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Sparkles } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getFeaturedCategories } from "@/app/actions/productActions";

gsap.registerPlugin(ScrollTrigger);

// const categories = [
//   "All",
//   "Microcontrollers",
//   "Sensors",
//   "Wireless Modules",
//   "Power Systems",
// ];

export function CategoryShowcase() {
  const [categories, setCategories] = useState([
    {
      id: "all",
      name: "All",
      slug: "all",
    },
  ]);
  const [activeCategory, setActiveCategory] = useState({
    id: "all",
    name: "All",
    slug: "all",
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const productsGridRef = useRef<HTMLDivElement>(null);

  // const filteredProducts =
  //   activeCategory === "All"
  //     ? featuredProducts.slice(0, 4)
  //     : featuredProducts
  //         .filter((p) => p.category === activeCategory)
  //         .slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".category-header", {
        scrollTrigger: {
          trigger: ".category-header",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, containerRef);

    const getCatos = async () => {
      const catos = await getFeaturedCategories();
      setCategories((prev) => [...prev, ...catos]);
    };

    getCatos();

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Animation when category changes
    if (productsGridRef.current) {
      gsap.fromTo(
        productsGridRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      );
    }
  }, [activeCategory]);

  return (
    <section ref={containerRef} className="py-24 ">
      <div className="container mx-auto px-4">
        <div className="category-header space-y-4 mb-12 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-3 h-3" />
            <span className="text-[10px] font-bold tracking-widest uppercase">
              Curated Collections
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none uppercase">
            Shop by{" "}
            <span className="text-primary italic tracking-tighter">
              Category
            </span>
          </h2>
          <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            Explore our most popular categories and find the perfect components
            for your next breakthrough.
          </p>
        </div>

        <Tabs
          defaultValue="All"
          className="w-full space-y-12"
          onValueChange={setActiveCategory}
        >
          <div className="flex justify-center overflow-x-auto pb-4 scrollbar-hide">
            <TabsList className="bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-neutral-800 p-1 h-auto rounded-full gap-2 flex-nowrap w-fit">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={{ id: cat.id, name: cat.name, slug: cat.slug }}
                  className="px-6 py-2.5 text-xs font-black uppercase tracking-widest rounded-full data-[state=active]:bg-primary data-[state=active]:text-black transition-all whitespace-nowrap"
                >
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div
            ref={productsGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[400px]"
          >
            {activeCategory.slug === "all" ? (
              categories.map(
                (c) =>
                  c.products &&
                  c.products.map((p) => <ProductCard key={p.id} product={p} />),
              )
            ) : categories.find((cat) => cat.id === activeCategory.id)?.products
                .length > 0 ? (
              categories
                .find((cat) => cat.id === activeCategory.id)
                ?.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center text-center py-20 space-y-4 opacity-50">
                <div className="w-16 h-16 rounded-full border border-dashed border-neutral-400 dark:border-neutral-600 flex items-center justify-center">
                  <span className="text-2xl">?</span>
                </div>
                <p className="font-bold uppercase tracking-widest text-sm">
                  No products found in this category
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              // className="group font-black uppercase tracking-widest border-2 border-neutral-200 dark:border-neutral-800 hover:border-primary hover:bg-primary/5 px-10 h-14 rounded-none"
              className="p-5"
            >
              Explore All{" "}
              {activeCategory === "All" ? "Products" : activeCategory.name}
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
