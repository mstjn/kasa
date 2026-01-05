import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex-1 md:px-20 px-5 mt-10">
     
      <Skeleton className="h-8 w-40 mb-6 rounded-full" />

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
       
        <div className="lg:col-span-2 space-y-8">
      
          <div className="grid grid-cols-2 gap-4">
          
            <Skeleton className="col-span-2 aspect-[16/9] rounded-xl" />

            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-xl" />
            ))}
          </div>

          <div className="space-y-3">
            <Skeleton className="h-7 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-full" />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Skeleton className="h-5 w-28" />
            <div className="flex gap-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-full" />
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-white rounded-xl p-6 space-y-6">
            <Skeleton className="h-5 w-32" />

            <div className="flex items-center gap-4">
              <Skeleton className="h-14 w-14 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>

            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </aside>
      </section>
    </main>
  );
}
