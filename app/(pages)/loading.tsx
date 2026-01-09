import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col items-center mt-10 gap-10 md:px-20 px-5 flex-1">
      <section
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-8
          w-full
          max-w-7xl
        "
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white flex flex-col gap-3 rounded-lg overflow-hidden">
            <div className="relative w-full aspect-4/4">
              <Skeleton className="absolute inset-0" />

              <Skeleton className="absolute top-3 right-3 h-8 w-8 rounded-lg" />
            </div>

            <div className="px-3 pb-5 space-y-2">
              <Skeleton className="h-5 w-3/4" />

              <Skeleton className="h-4 w-1/2" />

              <div className="mt-12">
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
