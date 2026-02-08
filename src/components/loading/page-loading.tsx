import { Skeleton } from "@/components/ui/skeleton";

/** Hybrid skeleton loading for all page types */
export function PageLoading() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Hero/Header Section */}
      <div className="relative h-[200px] w-full overflow-hidden bg-linear-to-r from-gray-200 to-gray-300 md:h-[280px]">
        <div className="absolute inset-0 animate-pulse bg-linear-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="content-container py-12 md:py-16">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left Column: Text Content */}
          <div className="flex-1 space-y-6">
            {/* Title Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-9 w-3/4 md:h-10" />
              <Skeleton className="h-5 w-1/2" />
            </div>

            {/* Featured Image/Card */}
            <Skeleton className="h-[200px] w-full rounded-2xl md:h-[260px]" />

            {/* Paragraph Lines */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            {/* Info Cards Row */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <Skeleton className="h-24 rounded-xl" />
              <Skeleton className="h-24 rounded-xl" />
              <Skeleton className="h-24 rounded-xl" />
            </div>

            {/* Additional Content Block */}
            <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-6">
              <Skeleton className="h-5 w-2/3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="w-full space-y-6 lg:w-72 xl:w-80">
            {/* Search Box Skeleton */}
            <Skeleton className="h-11 w-full rounded-xl" />

            {/* Section Title */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>

            {/* Related Items/Cards */}
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4"
                >
                  <Skeleton className="h-14 w-14 shrink-0 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Card Skeleton */}
            <div className="space-y-3 rounded-2xl bg-linear-to-br from-gray-100 to-gray-200 p-6">
              <Skeleton className="mx-auto h-10 w-10 rounded-xl" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-9 w-full rounded-lg" />
            </div>
          </div>
        </div>

        {/* Bottom Grid (For Homepage/List Pages) */}
        <div className="mt-12 space-y-8">
          {/* Section Header */}
          <div className="space-y-3 text-center">
            <Skeleton className="mx-auto h-8 w-48 md:h-9 md:w-60" />
            <Skeleton className="mx-auto h-4 w-60 md:w-80" />
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6"
              >
                <Skeleton className="h-14 w-14 rounded-xl" />
                <Skeleton className="h-5 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
