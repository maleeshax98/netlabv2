import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function ProductDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* LEFT COLUMN: Image Gallery Skeleton */}
      <section className="space-y-4">
        {/* Hero Image Skeleton - Matching aspect-[4/5] */}
        <Skeleton className="aspect-[4/5] w-full rounded-sm" />

        {/* Thumbnails Grid Skeleton */}
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-md" />
          ))}
        </div>
      </section>

      {/* RIGHT COLUMN: Product Details Skeleton */}
      <section className="flex flex-col">
        {/* Title Skeleton - Matching text-4xl height */}
        <Skeleton className="h-10 w-[80%] mb-4" />

        {/* Rating & Reviews Skeleton */}
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-8 w-16 rounded" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Price & Badge Skeleton */}
        <div className="flex items-baseline gap-3 mb-6">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Description Skeleton - Multi-line simulation */}
        <div className="space-y-2 mb-8">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[60%]" />
        </div>

        <Separator className="mb-8" />

        {/* Action Buttons Skeleton */}
        <div className="flex gap-4 mb-8">
          <Skeleton className="flex-[2] h-14 rounded-md" />
          <Skeleton className="flex-1 h-14 rounded-md" />
        </div>

        {/* Value Proposition Box Skeleton */}
        <div className="border rounded-md divide-y">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="p-4 flex gap-4 items-center">
              <Skeleton className="h-5 w-5 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
