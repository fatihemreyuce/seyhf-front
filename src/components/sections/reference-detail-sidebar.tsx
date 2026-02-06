"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, Building2, Mail, Award, Loader2 } from "lucide-react";
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

  // Debounce search query with longer delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 800);

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

  const [animatedReferences, setAnimatedReferences] = useState(references);
  const [isSearching, setIsSearching] = useState(false);

  // Animated filter with smooth transition
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      const filtered = references.filter((reference) =>
        reference.name
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase())
      );
      setAnimatedReferences(filtered);
      setTimeout(() => setIsSearching(false), 100);
    }, 400);

    return () => clearTimeout(timer);
  }, [debouncedSearchQuery, references]);

  const filteredReferences = animatedReferences;

  return (
    <div ref={sidebarRef} className="space-y-6">
      {/* Search Box */}
      <div
        className={`stat-card-enter space-y-6 lg:sticky lg:top-24 ${
          isVisible ? "visible" : ""
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-linear-to-r from-gray-50 to-transparent p-5">
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#111]">
              <Search className="h-5 w-5 text-(--brand-red)" />
              Referans Ara
            </h3>
          </div>
          <div className="p-5">
            <div className="relative">
              <input
                type="search"
                placeholder="Buradan arayın..."
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
              Diğer Referanslar
              <span className="ml-auto text-sm font-normal text-[#666]">
                ({filteredReferences.length})
              </span>
            </h3>
          </div>

          <div className="relative min-h-[120px] max-h-96 overflow-y-auto p-3">
            {isSearching && (
              <div className="absolute inset-0 z-10 flex items-center justify-center py-8" aria-hidden>
                <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
              </div>
            )}
            <div
              className={`space-y-1 transition-all duration-500 ${
                isSearching ? "pointer-events-none scale-95 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              {filteredReferences.length > 0 ? (
                filteredReferences.map((reference, index) => {
                  // Fix SSL issue with localhost
                  const logoUrl =
                    reference.logoUrl?.replace(
                      /^https:\/\/(localhost|127\.0\.0\.1)(:\d+)?/,
                      "http://$1$2"
                    ) || null;

                  return (
                    <Link
                      key={reference.id}
                      href={`${basePath}/references/${reference.id}`}
                      className="blog-item-enter group flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 transition-all hover:border-gray-100 hover:bg-gray-50"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                        {logoUrl ? (
                          <Image
                            src={logoUrl}
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
                  );
                })
              ) : (
                <div className="blog-item-enter py-8 text-center text-sm text-[#999]">
                  Referans bulunamadı
                </div>
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
              Referans Olun
            </h4>
            <p className="mb-4 text-sm leading-relaxed text-[#666]">
              Memnun müşterilerimizin listesine katılın ve başarı hikayenizi
              sergileyin
            </p>
            <Link
              href={`${basePath}/contact`}
              className="block w-full rounded-xl bg-(--brand-red) px-4 py-5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-(--brand-red)/90 hover:shadow-md xs:py-6"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
