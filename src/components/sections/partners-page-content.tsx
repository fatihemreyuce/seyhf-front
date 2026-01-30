"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { PartnerResponse } from "@/types/partner.types";
import { Search, Building2 } from "lucide-react";

interface PartnersPageContentProps {
  partners: PartnerResponse[];
  basePath?: string;
}

export function PartnersPageContent({ partners = [], basePath = "" }: PartnersPageContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [visibleSections, setVisibleSections] = useState({
    search: false,
    grid: false,
  });

  const searchRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

  const filteredPartners = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return partners;

    const query = debouncedSearchQuery.toLowerCase();
    return partners.filter((partner) =>
      partner.name.toLowerCase().includes(query)
    );
  }, [partners, debouncedSearchQuery]);

  // Sort by orderIndex
  const sortedPartners = useMemo(() => {
    return [...filteredPartners].sort((a, b) => a.orderIndex - b.orderIndex);
  }, [filteredPartners]);

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="content-container">
        {/* Stats Bar */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 px-6 py-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-(--brand-red)" />
            <span className="text-sm font-semibold text-[#666]">
              Showing {sortedPartners.length} of {partners.length} partners
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
              placeholder="Search partners by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border-2 border-gray-200 bg-white py-4 pl-6 pr-14 text-[#333] shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-(--brand-red) focus:outline-none focus:ring-4 focus:ring-(--brand-red)/10"
            />
            <Search className="pointer-events-none absolute right-5 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Grid */}
        {sortedPartners.length > 0 ? (
          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            {sortedPartners.map((partner, index) => (
              <div
                key={partner.id}
                className={`stat-card-enter stat-card-delay-${index % 4} group ${
                  visibleSections.grid ? "visible" : ""
                }`}
              >
                <Link
                  href={`${basePath}/partners/${partner.id}`}
                  className="relative block overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-gray-200 hover:shadow-xl"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-(--brand-red)/5 via-transparent to-gray-100 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Logo Container */}
                  <div className="relative z-10 flex aspect-square items-center justify-center">
                    {partner.logoUrl ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={partner.logoUrl}
                          alt={partner.name}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-110"
                          unoptimized={partner.logoUrl.startsWith("http")}
                        />
                      </div>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-xl bg-linear-to-br from-gray-100 to-gray-200 transition-all duration-500 group-hover:from-(--brand-red)/10 group-hover:to-(--brand-red)/5">
                        <Building2 className="h-12 w-12 text-gray-400 transition-colors duration-500 group-hover:text-(--brand-red)" />
                      </div>
                    )}
                  </div>

                  {/* Partner Name */}
                  <div className="relative z-10 mt-4 text-center">
                    <h3 className="text-sm font-bold text-[#111] transition-colors duration-300 line-clamp-2 group-hover:text-(--brand-red)">
                      {partner.name}
                    </h3>
                  </div>

                  {/* Bottom animated line */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-(--brand-red) to-(--brand-red)/70 transition-all duration-500 group-hover:w-full" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-gray-50 py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-200">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-[#333]">
              No partners found
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
