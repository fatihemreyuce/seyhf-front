"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import type { UsefulInformationResponse } from "@/types/useful.information";
import { Search, Filter, FileText, BookOpen, Info, Sparkles, FileCheck, FileSpreadsheet } from "lucide-react";

interface UsefulInfoPageContentProps {
  data: UsefulInformationResponse[];
  basePath?: string;
}

// Icon mapper for variety
const iconMap = [FileText, BookOpen, Info, Sparkles, FileCheck, FileSpreadsheet];

// Strip HTML tags from text
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function UsefulInfoPageContent({ data = [], basePath = "" }: UsefulInfoPageContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [animatedData, setAnimatedData] = useState(data);
  const [isSearching, setIsSearching] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    search: false,
    grid: false,
  });

  const searchRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
            } else if (entry.target === gridRef.current) {
              setVisibleSections((prev) => ({ ...prev, grid: true }));
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "-50px" }
    );

    if (searchRef.current) observer.observe(searchRef.current);
    if (gridRef.current) observer.observe(gridRef.current);

    return () => observer.disconnect();
  }, []);

  const filteredData = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return data;

    const query = debouncedSearchQuery.toLowerCase();
    return data.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query)
    );
  }, [data, debouncedSearchQuery]);

  // Animated filter with smooth transition
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setAnimatedData(filteredData);
      setTimeout(() => setIsSearching(false), 100);
    }, 400);

    return () => clearTimeout(timer);
  }, [filteredData]);

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="content-container">
        {/* Stats Bar */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 px-6 py-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-(--brand-red)" />
            <span className="text-sm font-semibold text-[#666]">
              Showing {animatedData.length} of {data.length} resources
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div
          ref={searchRef}
          className={`stat-card-enter mb-12 ${
            visibleSections.search ? "visible" : ""
          }`}
        >
          <div className="relative mx-auto max-w-2xl">
            <input
              type="search"
              placeholder="Search by title, description, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border-2 border-gray-200 bg-white py-4 pl-6 pr-14 text-[#333] shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-(--brand-red) focus:outline-none focus:ring-4 focus:ring-(--brand-red)/10"
            />
            <Search className="pointer-events-none absolute right-5 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Grid */}
        {animatedData.length > 0 ? (
          <div
            ref={gridRef}
            className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-500 ${
              isSearching ? "scale-95 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            {animatedData.map((item, index) => {
              const Icon = iconMap[index % iconMap.length];
              const plainExcerpt = stripHtml(item.excerpt);
              const plainDescription = stripHtml(item.description);

              return (
                <div
                  key={item.id}
                  className={`stat-card-enter stat-card-delay-${index % 3} group ${
                    visibleSections.grid ? "visible" : ""
                  }`}
                >
                  <Link
                    href={`${basePath}/useful-information/${item.id}`}
                    className="relative block h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-700 hover:-translate-y-2 hover:border-gray-200 hover:shadow-2xl"
                  >
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-linear-to-br from-(--brand-red)/5 via-transparent to-gray-100 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col">
                      {/* Icon */}
                      <div className="mb-6">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-gray-100 to-gray-200 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 group-hover:from-(--brand-red)/20 group-hover:to-(--brand-red)/10">
                          <Icon className="h-8 w-8 text-[#555] transition-all duration-700 group-hover:text-(--brand-red)" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-xl font-bold text-[#111] transition-colors duration-500 group-hover:text-(--brand-red)">
                        {item.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="mb-4 text-sm leading-relaxed text-[#666]">
                        {plainExcerpt}
                      </p>

                      {/* Description */}
                      <p className="grow text-xs leading-relaxed text-[#999] line-clamp-3">
                        {plainDescription}
                      </p>

                      {/* File indicator */}
                      {item.fileUrl && (
                        <div className="mt-4 inline-flex items-center gap-2 self-start rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-[#666]">
                          <FileText className="h-3.5 w-3.5" />
                          <span>Document Available</span>
                        </div>
                      )}

                      {/* Decorative corner element */}
                      <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-linear-to-br from-(--brand-red)/10 to-(--brand-red)/5 opacity-0 blur-2xl transition-all duration-700 group-hover:translate-x-6 group-hover:-translate-y-6 group-hover:opacity-100" />
                    </div>

                    {/* Bottom animated line */}
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-(--brand-red) to-(--brand-red)/70 transition-all duration-700 group-hover:w-full" />
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-gray-50 py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-200">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-[#333]">
              No results found
            </h3>
            <p className="mb-6 text-[#666]">
              Try adjusting your search to find what you're looking for
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="rounded-xl bg-(--brand-red) px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-(--brand-red)/90 hover:shadow-md"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
