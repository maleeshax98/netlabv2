"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TestimonialCard } from "./testimonial-card";
import { testimonials } from "@/constants/testimonials";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollContainer = scrollRef.current;

    const ctx = gsap.context(() => {
      // Calculate total width of one set of testimonials
      // We use triple testimonials to ensure enough content for infinite scroll on all screen sizes
      const totalWidth = scrollContainer.scrollWidth;
      const amountToScroll = totalWidth / 3;

      timelineRef.current = gsap.timeline({
        // repeat: -1,
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scrollContainer,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      timelineRef.current.to(scrollContainer, {
        x: -amountToScroll,
        duration: 40, // Smooth, slow scrolling
      });
    }, scrollRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (timelineRef.current) timelineRef.current.pause();
  };

  const handleMouseLeave = () => {
    if (timelineRef.current) timelineRef.current.play();
  };

  // Triple testimonials for a seamless loop on any screen size
  const duplicatedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section className="py-24 space-y-16 relative overflow-hidden bg-background/50">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
            <span className="text-[10px] font-bold tracking-widest uppercase">
              Testimonials
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            What Our{" "}
            <span className="text-primary italic tracking-tighter">
              Customers
            </span>{" "}
            Say
          </h2>
          <p className="text-muted-foreground font-medium leading-relaxed">
            Trusted by engineers, hobbyists, and students worldwide for
            high-quality electronic components and exceptional service.
          </p>
        </div>
      </div>

      <div
        className="w-full overflow-hidden relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={scrollRef}
          className="flex gap-8"
          style={{ width: "max-content" }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="shrink-0 w-[350px] md:w-[450px]"
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        {/* Gradient Fades for a premium look */}
        <div className="absolute top-0 left-0 h-full w-32 bg-linear-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-32 bg-linear-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
