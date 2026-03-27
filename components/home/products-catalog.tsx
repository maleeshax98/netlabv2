"use client";

import { useState, useRef, useMemo } from "react";
import { featuredProducts, exclusiveProducts } from "@/constants/products";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  PackageX,
  ChevronRight,
  Filter,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const allProducts = [...featuredProducts, ...exclusiveProducts];

export function ProductsCatalog() {
  const [activeCategory, setActiveCategory] = useState("All Components");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("All");

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Memoizing derived data is crucial for performance in large catalogs
  const categories = useMemo(
    () => [
      "All Components",
      ...Array.from(new Set(allProducts.map((p) => p.category))),
    ],
    [],
  );

  const priceRanges = ["All", "Under $10", "$10 - $50", "Over $50"];

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory =
        activeCategory === "All Components" ||
        product.category === activeCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      let matchesPrice = true;
      if (priceRange === "Under $10") matchesPrice = product.price < 10;
      else if (priceRange === "$10 - $50")
        matchesPrice = product.price >= 10 && product.price <= 50;
      else if (priceRange === "Over $50") matchesPrice = product.price > 50;

      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [activeCategory, searchQuery, priceRange]);

  // Industrial Animation Handling
  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.children;
      if (cards.length > 0) {
        // kill existing animations to prevent conflicts during rapid filtering
        gsap.killTweensOf(cards);

        gsap.fromTo(
          cards,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: {
              each: 0.03,
              from: "start",
            },
            ease: "power2.out",
          },
        );
      }
    },
    { dependencies: [filteredProducts], scope: containerRef },
  );

  const FilterContent = ({ isMobile = false }) => (
    <div className="space-y-8">
      {/* Search - Enhanced with Clear Button */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
          <Search className="w-3.5 h-3.5" /> Search
        </h3>
        <div className="relative group">
          <Input
            placeholder="Type to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 bg-secondary/50 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary/40"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Groups */}
      {[
        {
          title: "Categories",
          icon: Filter,
          items: categories,
          state: activeCategory,
          setter: setActiveCategory,
        },
        {
          title: "Price Range",
          icon: null,
          items: priceRanges,
          state: priceRange,
          setter: setPriceRange,
        },
      ].map((group) => (
        <div key={group.title} className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
            {group.icon && <group.icon className="w-3.5 h-3.5" />} {group.title}
          </h3>
          <div className="flex flex-col gap-1">
            {group.items.map((item) => (
              <button
                key={item}
                onClick={() => group.setter(item)}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all
                  ${
                    group.state === item
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                <span className="truncate">{item}</span>
                {group.state === item && (
                  <ChevronRight className="w-4 h-4 animate-in slide-in-from-left-1" />
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Desktop Sidebar: Sticky & Scrollable */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-28 h-[calc(100vh-120px)] overflow-y-auto pr-4 custom-scrollbar">
            <FilterContent />
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-border pb-8">
            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                {activeCategory.split(" ")[0]}
                <span className="text-primary">.</span>
              </h1>
              <p className="text-muted-foreground font-bold tracking-widest uppercase text-xs">
                Showing {filteredProducts.length} premium components
              </p>
            </div>

            {/* Mobile Filter Trigger */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="secondary"
                    className="w-full h-12 rounded-2xl font-black uppercase tracking-widest text-xs gap-3 border border-border"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Refine Selection
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="h-[90vh] rounded-t-[2rem] p-8 border-t-primary/20"
                >
                  <SheetHeader className="mb-6">
                    <SheetTitle className="text-2xl font-black uppercase">
                      Filters
                    </SheetTitle>
                    <SheetDescription>
                      Find the exact hardware you need.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="overflow-y-auto max-h-[60vh] pb-10">
                    <FilterContent isMobile />
                  </div>
                  <SheetClose asChild>
                    <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest mt-4">
                      View {filteredProducts.length} Results
                    </Button>
                  </SheetClose>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Grid: Auto-responsive columns */}
          <div
            ref={gridRef}
            className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 md:gap-8"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <EmptyState
                onReset={() => {
                  setActiveCategory("All Components");
                  setSearchQuery("");
                  setPriceRange("All");
                }}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// Sub-component for clean code structure
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="col-span-full py-24 rounded-[2rem] border-2 border-dashed border-muted flex flex-col items-center justify-center text-center px-6">
      <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center mb-6">
        <PackageX className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-black uppercase tracking-widest mb-2">
        No matches found
      </h3>
      <p className="text-muted-foreground max-w-xs mb-8 font-medium">
        Try adjusting your filters or search terms to find what you're looking
        for.
      </p>
      <Button
        onClick={onReset}
        variant="outline"
        className="rounded-full px-8 font-black uppercase tracking-widest border-2"
      >
        Reset All Filters
      </Button>
    </div>
  );
}
