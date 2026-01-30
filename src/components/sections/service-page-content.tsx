"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import type { ServiceResponse } from "@/types/service.types";
import type { ServiceCategoryResponse } from "@/types/service.categories.types";
import type { ServiceStatsResponse } from "@/types/service.stats.types";
import { ServiceCard } from "@/components/sections/service-card";
import { AnimatedStatCard } from "@/components/sections/animated-stat-card";
import { Search } from "lucide-react";

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
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [visibleSections, setVisibleSections] = useState({
    search: false,
    categories: false,
    services: false,
  });

  const searchRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Create a map of category id to category for easy lookup
  const categoryMap = useMemo(() => {
    const map = new Map<string, ServiceCategoryResponse>();
    categories.forEach((cat) => map.set(cat.id, cat));
    return map;
  }, [categories]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

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
      { threshold: 0.1 }
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
        if (!isNaN(categoryIdAsNumber) && s.categoryId === categoryIdAsNumber) return true;
        
        // Strategy 3: Check if categoryId matches the index/position in categories array
        const categoryIndex = categories.findIndex(c => c.id === selectedCategoryId);
        if (categoryIndex >= 0 && s.categoryId === categoryIndex + 1) return true;
        
        return false;
      });
    }

    if (debouncedSearchQuery.trim()) {
      const q = debouncedSearchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [services, selectedCategoryId, debouncedSearchQuery, categories]);

  return (
    <section className="bg-white">
      <div className="content-container py-16 md:py-20">
        {/* Stats Banner */}
        {stats.length > 0 && (
          <div className="mb-12 grid grid-cols-2 gap-5 md:grid-cols-4">
            {stats.slice(0, 4).map((stat: ServiceStatsResponse, index: number) => (
              <AnimatedStatCard
                key={stat.id}
                value={stat.numberValue}
                title={stat.title}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Search + Categories Filter */}
        <div className="mb-10 space-y-6">
          <div
            ref={searchRef}
            className={`stat-card-enter stat-card-delay-0 relative mx-auto max-w-xl ${
              visibleSections.search ? "visible" : ""
            }`}
          >
            <input
              type="search"
              placeholder="Search services by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-white py-3 pl-5 pr-12 text-sm text-[#333] shadow-sm placeholder:text-gray-400 focus:border-(--brand-red) focus:outline-none focus:ring-2 focus:ring-(--brand-red)/20"
            />
            <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>

          {categories.length > 0 && (
            <div
              ref={categoriesRef}
              className={`stat-card-enter stat-card-delay-1 flex flex-wrap justify-center gap-2 ${
                visibleSections.categories ? "visible" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => setSelectedCategoryId(null)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                  selectedCategoryId === null
                    ? "border-(--brand-red) bg-(--brand-red) text-white shadow-sm"
                    : "border-gray-200 bg-white text-[#666] hover:border-gray-300"
                }`}
              >
                All Services
              </button>
              {categories.map((cat: ServiceCategoryResponse) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                    selectedCategoryId === cat.id
                      ? "border-(--brand-red) bg-(--brand-red) text-white shadow-sm"
                      : "border-gray-200 bg-white text-[#666] hover:border-gray-300"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div
            ref={servicesRef}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredServices.map((service: ServiceResponse, index: number) => (
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
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-gray-50 py-16 text-center">
            <p className="text-[#666]">
              No services found matching your criteria.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategoryId(null);
                setSearchQuery("");
              }}
              className="mt-4 text-sm font-medium text-(--brand-red) hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
