import Image from "next/image";
import { ArrowRight, Cpu, Zap, Radio, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PromotionalHero() {
  return (
    <section className="container mx-auto px-4 py-8 space-y-6">
      {/* Top Large Card */}
      <div className="relative group overflow-hidden rounded-3xl bg-neutral-900 aspect-21/9 md:aspect-3/1">
        <div className="absolute inset-0  group-hover:scale-105 transition-transform duration-700">
          <Image
            src="/default.png"
            alt="Advanced Microcontrollers"
            fill
            className="object-cover"
          />
        </div>
        {/* <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" /> */}

        {/* <div className="relative h-full flex flex-col justify-center px-8 md:px-16 space-y-4 md:space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">
            <Cpu className="h-4 w-4" />
            <span className="text-xs font-bold tracking-widest uppercase">
              New Arrival
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Next-Gen <br />
            <span className="text-primary tracking-tighter italic">
              Microcontrollers
            </span>
          </h1>
          <p className="max-w-md text-neutral-300 text-sm md:text-lg font-medium leading-relaxed">
            Elevate your engineering projects with our latest collection of
            high-performance controllers and boards.
          </p>
          <div className="pt-2">
            <Button
              size="lg"
              className="rounded-full px-8 font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1"
            >
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div> */}
      </div>

      {/* Bottom 3 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Sensors */}
        <div className="relative group overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800 aspect-4/3 flex flex-col justify-end p-8 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-xl transition-all duration-300">
          {/* <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
            <Zap className="h-16 w-16 text-primary" />
          </div>
          <div className="space-y-3 relative z-10">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              Precision Sensors
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-snug">
              Accurate, reliable, and built for complex industrial automation.
            </p>
            <Button
              variant="link"
              className="p-0 h-auto font-bold text-primary group/btn"
            >
              Explore Now{" "}
              <ArrowRight className="ml-1 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div> */}
          <div className="absolute inset-0  group-hover:scale-105 transition-transform duration-700">
            <Image
              src="/default.png"
              alt="Advanced Microcontrollers"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Card 2: Modules */}
        <div className="relative group overflow-hidden rounded-2xl bg-primary aspect-4/3 flex flex-col justify-end p-8 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
          {/* <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-white via-transparent to-transparent " />
          <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500">
            <Radio className="h-16 w-16 text-white" />
          </div>
          <div className="space-y-3 relative z-10">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center text-white mb-2 backdrop-blur-md">
              <Radio className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">
              Wireless Modules
            </h3>
            <p className="text-primary-foreground/80 text-sm leading-snug">
              Connectivity solutions for IoT, smart homes, and long-range relay.
            </p>
            <Button
              variant="outline"
              className="bg-white/10 hover:bg-white text-white hover:text-primary border-white/20 rounded-full px-6 font-bold shadow-lg transition-colors"
            >
              View Collection
            </Button>
          </div>
           */}
          <div className="absolute inset-0  group-hover:scale-105 transition-transform duration-700">
            <Image
              src="/default.png"
              alt="Advanced Microcontrollers"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Card 3: Power */}
        <div className="relative group overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800 aspect-4/3 flex flex-col justify-end p-8 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-xl transition-all duration-300">
          {/* <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
            <Settings className="h-16 w-16 text-secondary" />
          </div>
          <div className="space-y-3 relative z-10">
            <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mb-2">
              <Settings className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">Power Systems</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-snug">
              Efficient voltage regulators, adapters, and battery management.
            </p>
            <Button
              variant="link"
              className="p-0 h-auto font-bold text-primary group/btn"
            >
              Shop Now{" "}
              <ArrowRight className="ml-1 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div> */}
          <div className="absolute inset-0  group-hover:scale-105 transition-transform duration-700">
            <Image
              src="/default.png"
              alt="Advanced Microcontrollers"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
