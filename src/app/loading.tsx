import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/layout/header";

export default function Loading() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 pb-12 flex-1">
        <div className="flex flex-col gap-6">
          {/* Current Weather Card Skeleton */}
          <Skeleton className="w-full h-[300px] md:h-[250px] rounded-xl glass-panel" />
          
          {/* Details Grid Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl glass-panel" />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Hourly Skeleton */}
              <Skeleton className="w-full h-48 rounded-xl glass-panel" />
              {/* Chart Skeleton */}
              <Skeleton className="w-full h-[350px] rounded-xl glass-panel" />
            </div>
            
            <div className="lg:col-span-1">
              {/* Daily Skeleton */}
              <Skeleton className="w-full h-[450px] rounded-xl glass-panel" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
