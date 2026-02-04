import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AboutLoading() {
  return (
    <main>
      {/* Hero skeleton */}
      <section className="relative min-h-[260px] overflow-hidden bg-gray-300 py-20 md:min-h-[320px] md:py-28 lg:min-h-[360px]">
        <div className="content-container flex min-h-[200px] flex-col items-center justify-center gap-4">
          <Skeleton className="h-10 w-48 bg-white/30 md:h-12 md:w-56" />
          <Skeleton className="h-5 w-32 bg-white/20" />
        </div>
      </section>

      <div className="content-container py-16 md:py-20 lg:py-24">
        <Card className="mb-16 border-gray-200 bg-white">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>

        <Skeleton className="mb-6 h-8 w-48" />
        <div className="mb-16 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-gray-200">
              <CardContent className="flex items-center gap-4 p-5">
                <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Skeleton className="mb-6 h-8 w-32" />
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-gray-200">
              <CardContent className="flex items-center gap-4 p-5">
                <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
