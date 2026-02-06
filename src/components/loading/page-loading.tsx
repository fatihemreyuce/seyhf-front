import { Skeleton } from "@/components/ui/skeleton";

/** Hybrid skeleton loading for all page types */
export function PageLoading() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Hero/Header Section */}
      <div className="relative h-[280px] w-full overflow-hidden bg-linear-to-r from-gray-200 to-gray-300 md:h-[400px]">
        <div className="absolute inset-0 animate-pulse bg-linear-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="content-container py-16 md:py-20">
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Left Column: Text Content */}
          <div className="flex-1 space-y-8">
            {/* Title Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4 md:h-14" />
              <Skeleton className="h-7 w-1/2" />
            </div>

            {/* Featured Image/Card */}
            <Skeleton className="h-[280px] w-full rounded-2xl md:h-[380px]" />

            {/* Paragraph Lines */}
            <div className="space-y-5">
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            </div>

            {/* Info Cards Row */}
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
            </div>

            {/* Additional Content Block */}
            <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-8">
              <Skeleton className="h-7 w-2/3" />
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="w-full space-y-8 lg:w-80 xl:w-96">
            {/* Search Box Skeleton */}
            <Skeleton className="h-14 w-full rounded-xl" />

            {/* Section Title */}
            <div className="space-y-3">
              <Skeleton className="h-7 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            {/* Related Items/Cards */}
            <div className="space-y-5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex gap-5 rounded-xl border border-gray-200 bg-white p-5"
                >
                  <Skeleton className="h-20 w-20 shrink-0 rounded-lg" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Card Skeleton */}
            <div className="space-y-4 rounded-2xl bg-linear-to-br from-gray-100 to-gray-200 p-8">
              <Skeleton className="mx-auto h-14 w-14 rounded-xl" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </div>
        </div>

        {/* Bottom Grid (For Homepage/List Pages) */}
        <div className="mt-16 space-y-10">
          {/* Section Header */}
          <div className="space-y-4 text-center">
            <Skeleton className="mx-auto h-10 w-56 md:h-12 md:w-72" />
            <Skeleton className="mx-auto h-5 w-72 md:w-[28rem]" />
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="space-y-5 rounded-2xl border border-gray-200 bg-white p-8"
              >
                <Skeleton className="h-20 w-20 rounded-xl" />
                <Skeleton className="h-7 w-3/4" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <Skeleton className="h-10 w-28 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
