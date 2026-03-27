import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Testimonial } from "@/constants/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="relative overflow-hidden border-none bg-card/40 backdrop-blur-xl transition-all duration-300 hover:bg-card/60 group">
      {/* Decorative Quote Icon */}
      <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote className="h-10 w-10 text-primary" />
      </div>

      <CardContent className="p-8 space-y-6">
        {/* Rating */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < testimonial.rating 
                  ? "fill-primary text-primary" 
                  : "fill-muted text-muted"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <p className="text-lg font-medium leading-relaxed italic text-foreground/90">
          "{testimonial.content}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h4 className="font-bold text-base tracking-tight">{testimonial.name}</h4>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
              {testimonial.role}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
