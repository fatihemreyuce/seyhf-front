"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ReferenceResponse } from "@/types/references.types";
import { Search, Award, Building2, ExternalLink, Globe } from "lucide-react";

interface ReferencesPageContentProps {
  references: ReferenceResponse[];
  basePath?: string;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function ReferencesPageContent({
  references = [],
  basePath = "",
}: ReferencesPageContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [animatedReferences, setAnimatedReferences] = useState(references);
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

  const filteredReferences = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return references;

    const query = debouncedSearchQuery.toLowerCase();
    return references.filter(
      (reference) =>
        reference.name.toLowerCase().includes(query) ||
        reference.description.toLowerCase().includes(query)
    );
  }, [references, debouncedSearchQuery]);

  // Sort by orderIndex
  const sortedReferences = useMemo(() => {
    return [...filteredReferences].sort((a, b) => a.orderIndex - b.orderIndex);
  }, [filteredReferences]);

  // Animated filter with smooth transition
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setAnimatedReferences(sortedReferences);
      setTimeout(() => setIsSearching(false), 100);
    }, 400);

    return () => clearTimeout(timer);
  }, [sortedReferences]);

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="content-container">
        {/* Stats Bar */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 px-6 py-4">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-(--brand-red)" />
            <span className="text-sm font-semibold text-[#666]">
              Showing {animatedReferences.length} of {references.length} references
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
              placeholder="Search references by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border-2 border-gray-200 bg-white py-4 pl-6 pr-14 text-[#333] shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-(--brand-red) focus:outline-none focus:ring-4 focus:ring-(--brand-red)/10"
            />
            <Search className="pointer-events-none absolute right-5 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Grid */}
        {animatedReferences.length > 0 ? (
          <div
            ref={gridRef}
            className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-all duration-500 ${
              isSearching ? "scale-95 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            {animatedReferences.map((reference, index) => {
              // Fix SSL issue with localhost
              const logoUrl = reference.logoUrl?.replace(/^https:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, "http://$1$2") || null;
              
              return (
                <div
                  key={reference.id}
                  className={`stat-card-enter stat-card-delay-${index % 4} group ${
                    visibleSections.grid ? "visible" : ""
                  }`}
                >
                  <Link
                    href={`${basePath}/references/${reference.id}`}
                    className="relative block h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-(--brand-red)/30 hover:shadow-xl"
                  >
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-linear-to-br from-(--brand-red)/5 via-transparent to-gray-100 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col p-6">
                      {/* Logo */}
                      <div className="mb-5 flex items-center justify-center">
                        <div className="relative h-24 w-full overflow-hidden rounded-xl bg-gray-50 p-4 transition-all duration-500 group-hover:bg-white group-hover:shadow-md">
                          {logoUrl ? (
                            <div className="relative h-full w-full">
                              <Image
                                src={logoUrl}
                                alt={reference.name}
                                fill
                                className="object-contain transition-transform duration-500 group-hover:scale-110"
                                unoptimized
                              />
                            </div>
                          ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Building2 className="h-12 w-12 text-gray-300 transition-colors duration-500 group-hover:text-(--brand-red)" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="mb-3 text-center text-lg font-bold text-[#111] transition-colors duration-300 line-clamp-2 group-hover:text-(--brand-red)">
                      {reference.name}
                    </h3>

                    {/* Description */}
                    <p className="mb-4 grow text-center text-sm leading-relaxed text-[#666] line-clamp-3">
                      {stripHtml(reference.description)}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-center gap-2 border-t border-gray-100 pt-4 text-xs text-[#999] transition-colors duration-300 group-hover:border-(--brand-red)/20 group-hover:text-(--brand-red)">
                      <Globe className="h-3.5 w-3.5" />
                      <span className="font-medium">View Details</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* Bottom line */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-(--brand-red) to-(--brand-red)/70 transition-all duration-500 group-hover:w-full" />
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
              No references found
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
