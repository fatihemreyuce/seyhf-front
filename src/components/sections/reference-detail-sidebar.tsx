"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, Building2, Mail, Award } from "lucide-react";
import type { ReferenceResponse } from "@/types/references.types";

interface ReferenceDetailSidebarProps {
  references: ReferenceResponse[];
  basePath?: string;
}

export function ReferenceDetailSidebar({
  references,
  basePath = "",
}: ReferenceDetailSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: "-50px" }
    );

    if (sidebarRef.current) {
      observer.observe(sidebarRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredReferences = references.filter((reference) =>
    reference.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  return (
    <div ref={sidebarRef} className="space-y-6">
      {/* Search Box */}
      <div
        className={`stat-card-enter sticky top-24 space-y-6 ${
          isVisible ? "visible" : ""
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-linear-to-r from-gray-50 to-transparent p-5">
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#111]">
              <Search className="h-5 w-5 text-(--brand-red)" />
              Search References
            </h3>
          </div>
          <div className="p-5">
            <div className="relative">
              <input
                type="search"
                placeholder="Search here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 py-3 pl-4 pr-11 text-sm text-[#333] transition-all duration-300 placeholder:text-gray-400 focus:border-(--brand-red) focus:bg-white focus:outline-none focus:ring-2 focus:ring-(--brand-red)/20"
              />
              <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* References List */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-linear-to-r from-gray-50 to-transparent p-5">
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#111]">
              <Award className="h-5 w-5 text-(--brand-red)" />
              Other References
              <span className="ml-auto text-sm font-normal text-[#666]">
                ({filteredReferences.length})
              </span>
            </h3>
          </div>

          <div className="max-h-96 overflow-y-auto p-3">
            <div className="space-y-1">
              {filteredReferences.length > 0 ? (
                filteredReferences.map((reference) => (
                  <Link
                    key={reference.id}
                    href={`${basePath}/references/${reference.id}`}
                    className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 transition-all hover:border-gray-100 hover:bg-gray-50"
                  >
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                      {reference.logo ? (
                        <Image
                          src={reference.logo}
                          alt={reference.name}
                          fill
                          className="object-contain p-1"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Building2 className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <span className="min-w-0 flex-1 text-sm font-medium text-[#666] transition-colors line-clamp-2 group-hover:text-[#111]">
                      {reference.name}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-gray-300 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-(--brand-red) group-hover:opacity-100" />
                  </Link>
                ))
              ) : (
                <p className="py-8 text-center text-sm text-[#999]">
                  No references found
                </p>
              )}
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="overflow-hidden rounded-2xl border-2 border-(--brand-red)/20 bg-linear-to-br from-(--brand-red)/5 via-white to-(--brand-red)/10 shadow-sm">
          <div className="p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-(--brand-red)/10">
              <Mail className="h-6 w-6 text-(--brand-red)" />
            </div>
            <h4 className="mb-2 text-lg font-bold text-[#111]">
              Become a Reference
            </h4>
            <p className="mb-4 text-sm leading-relaxed text-[#666]">
              Join our list of satisfied clients and showcase your success story
            </p>
            <Link
              href={`${basePath}/contact`}
              className="block w-full rounded-xl bg-(--brand-red) px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-(--brand-red)/90 hover:shadow-md"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
