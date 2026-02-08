import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AboutLoading() {
  return (
    <main>
      {/* Hero skeleton */}
      <section className="relative min-h-[180px] overflow-hidden bg-gray-300 py-14 md:min-h-[220px] md:py-20 lg:min-h-[260px]">
        <div className="content-container flex min-h-[140px] flex-col items-center justify-center gap-3">
          <Skeleton className="h-8 w-40 bg-white/30 md:h-9 md:w-48" />
          <Skeleton className="h-4 w-28 bg-white/20" />
        </div>
      </section>

      <div className="content-container py-12 md:py-16 lg:py-20">
        <Card className="mb-12 border-gray-200 bg-white">
          <CardHeader>
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </CardContent>
        </Card>

        <Skeleton className="mb-4 h-6 w-40" />
        <div className="mb-12 grid gap-3 sm:grid-cols-1 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-gray-200">
              <CardContent className="flex items-center gap-3 p-4">
                <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Skeleton className="mb-4 h-6 w-28" />
        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-gray-200">
              <CardContent className="flex items-center gap-3 p-4">
                <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-2.5 w-14" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
