"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Or use any other icon library
import { Button } from "@/components/ui/button"; // Replace with your button component if needed
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Replace with your card components if needed
import { cn } from "@/lib/utils"; // If using custom style classes

// Sample product images (replace with your actual image URLs or paths)
const productImages = [
  "https://images.unsplash.com/photo-1615865416041-e94d80a3733c?q=80&w=1920&h=1080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1920&h=1080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1920&h=1080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1563177708-372134015f60?q=80&w=1920&h=1080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

function ExclusiveSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderRef = useRef(null);

  const totalImages = productImages.length;

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const prevSlide = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + totalImages) % totalImages,
    );
  };

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    // Basic automatic sliding (optional)
    const interval = setInterval(nextSlide, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [currentImageIndex]); // Run whenever the current image changes

  return (
    <section className="bg-muted rounded-3xl py-12 md:py-24 lg:py-32">
      
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tighter md:text-4xl">
              Exclusive Product Spotlight
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our featured collection and special offers. Don't miss
              out on these exceptional products.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-background shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`,
              }}
              ref={sliderRef}
            >
              {productImages.map((imageUrl, index) => (
                <div key={index} className="w-full shrink-0">
                  <img
                    src={imageUrl}
                    alt={`Product image ${index + 1}`}
                    className="aspect-[16/9] w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Slider Controls */}
            <div className="absolute inset-0 flex items-center justify-between p-4 z-10">
              <Button
                variant="outline"
                size="icon"
                className="bg-background/80 hover:bg-background/100"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous slide</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-background/80 hover:bg-background/100"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next slide</span>
              </Button>
            </div>

            {/* Pagination Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-3 h-3 rounded-full bg-primary/20 hover:bg-primary/50",
                    index === currentImageIndex && "bg-primary",
                  )}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExclusiveSection;
