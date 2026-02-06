"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import type { ServiceResponse } from "@/types/service.types";
import type { ServiceCategoryResponse } from "@/types/service.categories.types";
import type { ServiceStatsResponse } from "@/types/service.stats.types";
import { ServiceCard } from "@/components/sections/service-card";
import { AnimatedStatCard } from "@/components/sections/animated-stat-card";
import { Search, LayoutList, Loader2 } from "lucide-react";

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
    isActive,
    onClick,
  }: {
    label: string;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors duration-300 ease-out ${
        isActive ? "bg-brand-red text-white shadow-sm" : "text-text-secondary"
      }`}
    >
      {label}
    </button>
  );

  const CategorySidebar = ({ onSelect }: { onSelect?: () => void }) => (
    <nav className="space-y-1.5">
      <CategoryButton
        label="Tüm Hizmetler"
        isActive={selectedCategoryId === null}
        onClick={() => {
          setSelectedCategoryId(null);
          onSelect?.();
        }}
      />
      {categories.map((cat: ServiceCategoryResponse) => (
        <CategoryButton
          key={cat.id}
          label={cat.name}
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
                  <span
                    className={`text-xs text-gray-500 transition-transform ${mobileCategoriesOpen ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </button>
                {mobileCategoriesOpen && (
                  <div className="mt-3 max-h-64 overflow-y-auto rounded-xl border border-gray-100 bg-gray-50 p-3">
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
                <div className="sticky top-24 rounded-2xl border border-gray-100 bg-gray-50/80 p-4 shadow-sm backdrop-blur-sm">
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Kategoriler
                  </h3>
                  <CategorySidebar />
                </div>
              </div>
            </aside>
          )}

          {/* Main Content: Search + Services Grid */}
          <div className="min-w-0 flex-1 overflow-hidden">
            <div
              ref={searchRef}
              className={`stat-card-enter stat-card-delay-0 relative mb-8 ${
                visibleSections.search ? "visible" : ""
              }`}
            >
              <input
                type="search"
                placeholder="Başlık veya açıklamaya göre hizmet ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-5 pr-12 text-sm text-[#333] shadow-sm placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
              />
              <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>

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
