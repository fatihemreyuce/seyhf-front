"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import type { ServiceResponse } from "@/types/service.types";
import type { ServiceCategoryResponse } from "@/types/service.categories.types";
import type { ServiceStatsResponse } from "@/types/service.stats.types";
import { ServiceCard } from "@/components/sections/service-card";
import { AnimatedStatCard } from "@/components/sections/animated-stat-card";
import { Search, LayoutList, Loader2, LayoutGrid, ChevronRight, ChevronDown } from "lucide-react";

export interface ServicePageContentProps {
  services: ServiceResponse[];
  categories: ServiceCategoryResponse[];
  stats: ServiceStatsResponse[];
  basePath?: string;
}

export function ServicePageContent({
  services = [],
  categories = [],
  stats = [],
  basePath = "",
}: ServicePageContentProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [animatedServices, setAnimatedServices] = useState(services);
  const [isSearching, setIsSearching] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    search: false,
    categories: false,
    services: false,
  });
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Create a map of category id to category for easy lookup
  const categoryMap = useMemo(() => {
    const map = new Map<string, ServiceCategoryResponse>();
    categories.forEach((cat) => map.set(cat.id, cat));
    return map;
  }, [categories]);

  // Her kategorideki hizmet sayısı
  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    categories.forEach((cat, index) => {
      const count = services.filter((s) => {
        if (s.categoryId.toString() === cat.id) return true;
        const catIdNum = parseInt(cat.id, 10);
        if (!isNaN(catIdNum) && s.categoryId === catIdNum) return true;
        if (s.categoryId === index + 1) return true;
        return false;
      }).length;
      counts.set(cat.id, count);
    });
    return counts;
  }, [services, categories]);

  // Debounce search query with longer delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === searchRef.current) {
              setVisibleSections((prev) => ({ ...prev, search: true }));
            } else if (entry.target === categoriesRef.current) {
              setVisibleSections((prev) => ({ ...prev, categories: true }));
            } else if (entry.target === servicesRef.current) {
              setVisibleSections((prev) => ({ ...prev, services: true }));
            }
          }
        });
      },
      { threshold: 0.1 },
    );

    if (searchRef.current) observer.observe(searchRef.current);
    if (categoriesRef.current) observer.observe(categoriesRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);

    return () => observer.disconnect();
  }, []);

  const filteredServices = useMemo(() => {
    let result = services;

    if (selectedCategoryId !== null) {
      // Try multiple matching strategies since backend might use different ID formats
      result = result.filter((s) => {
        // Strategy 1: Direct string comparison
        if (s.categoryId.toString() === selectedCategoryId) return true;

        // Strategy 2: Parse category ID as number
        const categoryIdAsNumber = parseInt(selectedCategoryId, 10);
        if (!isNaN(categoryIdAsNumber) && s.categoryId === categoryIdAsNumber)
          return true;

        // Strategy 3: Check if categoryId matches the index/position in categories array
        const categoryIndex = categories.findIndex(
          (c) => c.id === selectedCategoryId,
        );
        if (categoryIndex >= 0 && s.categoryId === categoryIndex + 1)
          return true;

        return false;
      });
    }

    if (debouncedSearchQuery.trim()) {
      const q = debouncedSearchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q),
      );
    }

    return result;
  }, [services, selectedCategoryId, debouncedSearchQuery, categories]);

  // Animated filter with smooth transition
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setAnimatedServices(filteredServices);
      setTimeout(() => setIsSearching(false), 100);
    }, 400);

    return () => clearTimeout(timer);
  }, [filteredServices]);

  const CategoryButton = ({
    label,
    count,
    isActive,
    onClick,
  }: {
    label: string;
    count: number;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-xl px-4 py-3.5 text-left text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 ${
        isActive
          ? "bg-brand-red text-white shadow-md shadow-brand-red/25"
          : "text-gray-600 hover:translate-x-0.5 hover:bg-gray-50 hover:text-[#111] active:scale-[0.99]"
      }`}
    >
      <span className="relative z-10 flex min-w-0 flex-1 items-center gap-3">
        {isActive && (
          <ChevronRight className="h-4 w-4 shrink-0 opacity-90" strokeWidth={2.5} />
        )}
        <span className="line-clamp-1 truncate">{label}</span>
      </span>
      <span
        className={`relative z-10 shrink-0 rounded-md px-2 py-0.5 text-xs font-medium tabular-nums ${
          isActive
            ? "bg-white/20 text-white backdrop-blur-sm"
            : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700"
        }`}
      >
        {count}
      </span>
    </button>
  );

  const CategorySidebar = ({ onSelect }: { onSelect?: () => void }) => (
    <nav className="space-y-1.5">
      <CategoryButton
        label="Tüm Hizmetler"
        count={services.length}
        isActive={selectedCategoryId === null}
        onClick={() => {
          setSelectedCategoryId(null);
          onSelect?.();
        }}
      />
      {categories.length > 0 && (
        <div className="my-2 border-t border-gray-200/80" aria-hidden />
      )}
      {categories.map((cat: ServiceCategoryResponse) => (
        <CategoryButton
          key={cat.id}
          label={cat.name}
          count={categoryCounts.get(cat.id) ?? 0}
          isActive={selectedCategoryId === cat.id}
          onClick={() => {
            setSelectedCategoryId(cat.id);
            onSelect?.();
          }}
        />
      ))}
    </nav>
  );

  return (
    <section className="bg-white">
      <div className="content-container py-16 md:py-20">
        {/* Search Bar - Top, Full Width */}
        <div
          ref={searchRef}
          className={`stat-card-enter stat-card-delay-0 relative mb-8 ${
            visibleSections.search ? "visible" : ""
          }`}
        >
          <input
            id="service-page-search"
            type="search"
            placeholder="Başlık veya açıklamaya göre hizmet ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-5 pr-12 text-sm text-[#333] shadow-sm placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
          />
          <label
            htmlFor="service-page-search"
            className="search-icon-focusable absolute right-4 top-1/2 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center"
          >
            <Search className="h-5 w-5 text-gray-400" />
          </label>
        </div>

        {/* Stats Banner */}
        {stats.length > 0 && (
          <div className="mb-12 grid grid-cols-2 gap-5 md:grid-cols-4">
            {stats
              .slice(0, 4)
              .map((stat: ServiceStatsResponse, index: number) => (
                <AnimatedStatCard
                  key={stat.id}
                  value={stat.numberValue}
                  title={stat.title}
                  index={index}
                />
              ))}
          </div>
        )}

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          {/* Left Sidebar - Categories (desktop) + Mobile toggle */}
          {categories.length > 0 && (
            <aside className="relative z-20 lg:w-64 lg:shrink-0">
              {/* Mobile: Collapsible category panel */}
              <div className="lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                  className="stat-card-enter stat-card-delay-1 flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm font-medium text-text-secondary shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <LayoutList className="h-4 w-4 text-gray-500" />
                    {selectedCategoryId === null
                      ? "Tüm Hizmetler"
                      : (categoryMap.get(selectedCategoryId)?.name ??
                        "Kategori seçin")}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200 ${mobileCategoriesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileCategoriesOpen && (
                  <div className="mt-3 max-h-64 overflow-y-auto rounded-xl border border-gray-200/60 bg-white p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
                    <div className="mb-4 flex items-center gap-2.5">
                      <LayoutGrid className="h-4 w-4 text-brand-red" strokeWidth={2} />
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Kategoriler
                      </span>
                    </div>
                    <CategorySidebar
                      onSelect={() => setMobileCategoriesOpen(false)}
                    />
                  </div>
                )}
              </div>
              {/* Desktop: Sticky sidebar */}
              <div
                ref={categoriesRef}
                className={`hidden lg:block stat-card-enter stat-card-delay-1 ${visibleSections.categories ? "visible" : ""}`}
              >
                <div className="sticky top-24 overflow-hidden rounded-2xl border border-gray-200/60 bg-white p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06),0_2px_8px_-2px_rgba(0,0,0,0.04)]">
                  <div className="mb-5 flex items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-red/10">
                      <LayoutGrid className="h-4 w-4 text-brand-red" strokeWidth={2} />
                    </div>
                    <h3 className="text-sm font-semibold tracking-tight text-[#111]">
                      Kategoriler
                    </h3>
                  </div>
                  <CategorySidebar />
                </div>
              </div>
            </aside>
          )}

          {/* Main Content: Services Grid */}
          <div className="min-w-0 flex-1 overflow-hidden">
            {/* Services Grid */}
            <div ref={servicesRef} className="relative min-h-[200px]">
              {isSearching && (
                <div
                  className="absolute inset-0 z-10 flex min-h-[200px] items-center justify-center bg-white/90 backdrop-blur-sm"
                  aria-hidden
                >
                  <Loader2 className="h-10 w-10 animate-spin text-brand-red" />
                </div>
              )}
              {animatedServices.length > 0 ? (
                <div
                  className={`grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 transition-all duration-500 ${
                    isSearching
                      ? "pointer-events-none scale-95 opacity-0"
                      : "scale-100 opacity-100"
                  }`}
                >
                  {animatedServices.map(
                    (service: ServiceResponse, index: number) => (
                      <div
                        key={service.id}
                        className={`stat-card-enter stat-card-delay-${index % 4} ${
                          visibleSections.services ? "visible" : ""
                        }`}
                      >
                        <ServiceCard
                          id={service.id}
                          title={service.title}
                          description={service.description}
                          basePath={basePath}
                        />
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <div
                  className={`rounded-2xl border border-gray-100 bg-gray-50 py-16 text-center transition-opacity ${
                    isSearching ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <p className="text-[#666]">
                    Kriterlere uygun hizmet bulunamadı.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategoryId(null);
                      setSearchQuery("");
                    }}
                    className="mt-4 text-sm font-medium text-brand-red hover:underline"
                  >
                    Filtreleri temizle
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
