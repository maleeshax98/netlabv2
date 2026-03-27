"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Truck,
  ShieldCheck,
  Zap,
  HeadphonesIcon,
} from "lucide-react";
import { useGSAP } from "@gsap/react";

const faqs = [
  {
    id: "fq1",
    question: "How long does shipping typically take?",
    answer:
      "For domestic orders, shipping usually takes 2-4 business days. International shipping varies by location but typically ranges from 7-14 business days. All orders include real-time tracking.",
    icon: Truck,
  },
  {
    id: "fq2",
    question: "Are your components genuinely sourced?",
    answer:
      "Yes, 100%. We source all our components directly from authorized distributors and manufacturers. Every part undergoes a rigorous quality check before being listed on NET.",
    icon: ShieldCheck,
  },
  {
    id: "fq3",
    question: "Do you offer technical support for projects?",
    answer:
      "While we don't provide full engineering consulting, we offer extensive documentation, library support, and a community forum where you can get help with component-specific questions.",
    icon: HeadphonesIcon,
  },
  {
    id: "fq4",
    question: "What is your return policy for electronic parts?",
    answer:
      "We accept returns within 30 days for items in their original, unopened packaging. Due to the sensitive nature of electronics, opened or soldered components can only be returned if they are found to be defective.",
    icon: Zap,
  },
];

export function FaqSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.from(".accordion-item", {
      x: -20,
      opacity: 0,
      // duration: 0.6,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Decorative background blur */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 max-w-4xl">
        <div ref={headerRef} className="space-y-4 mb-16 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
            <HelpCircle className="w-3 h-3" />
            <span className="text-[10px] font-bold tracking-widest uppercase">
              Support Center
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none uppercase">
            Frequently Asked{" "}
            <span className="text-primary italic tracking-tighter">
              Questions
            </span>
          </h2>
          <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about our products, shipping, and
            technical standards.
          </p>
        </div>

        <div className="accordion-container">
          <Accordion type="single" collapsible className="w-full space-y-4 ">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="accordion-item border-none px-6 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 data-[state=open]:border-primary rounded-2xl cursor-pointer"
              >
                <AccordionTrigger className="hover:no-underline py-6  cursor-pointer">
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-2 bg-primary/10 text-primary">
                      <faq.icon className="w-4 h-4" />
                    </div>
                    <span className="text-lg font-bold tracking-tight uppercase">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground font-medium leading-relaxed text-base  cursor-pointer">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
