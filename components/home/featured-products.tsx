import { ProductCard } from "./product-card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export async function FeaturedProducts() {
  const featuredProducts = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  });

  return (
    <section className="container mx-auto px-4 py-16 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30 backdrop-blur-sm">
            <span className="text-[10px] font-bold tracking-widest uppercase">
              Our Collection
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Featured{" "}
            <span className="text-primary italic tracking-tighter">
              Products
            </span>
          </h2>
          <p className="max-w-xl text-muted-foreground font-medium leading-relaxed">
            Discover our handpicked selection of top-quality electronic
            components, from powerful microcontrollers to precise sensors.
          </p>
        </div>
        <Button
          variant="ghost"
          className="group font-bold text-primary hover:bg-primary/5"
        >
          View All Products{" "}
          <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
