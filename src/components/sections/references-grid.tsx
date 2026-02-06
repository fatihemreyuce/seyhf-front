"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Building2, Globe, Sparkles, Eye } from "lucide-react";
import type { ReferenceResponse } from "@/types/references.types";

interface ReferencesGridProps {
  references: ReferenceResponse[];
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function ReferencesGrid({ references }: ReferencesGridProps) {
  const [mounted, setMounted] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0",
              10
            );
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: "-50px" }
    );

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll("[data-index]");
      cards.forEach((card) => observer.observe(card));
    }

    return () => observer.disconnect();
  }, [references, mounted]);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {references.map((reference, index) => (
        <ReferenceCard
          key={reference.id}
          reference={reference}
          index={index}
          isVisible={!mounted || visibleCards.has(index)}
        />
      ))}
    </div>
  );
}

interface ReferenceCardProps {
  reference: ReferenceResponse;
  index: number;
  isVisible: boolean;
}

function ReferenceCard({ reference, index, isVisible }: ReferenceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const plainDescription = stripHtml(reference.description);
  
  // Fix SSL issue with localhost
  const logoUrl = reference.logoUrl?.replace(/^https:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, "http://$1$2") || null;

  return (
    <div
      data-index={index}
      className={`stat-card-enter stat-card-delay-${index % 4} group ${
        isVisible ? "visible" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/references/${reference.id}`}
        className="relative block h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-700 hover:-translate-y-2 hover:border-(--brand-red)/30 hover:shadow-2xl hover:shadow-(--brand-red)/10"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-(--brand-red)/5 via-transparent to-gray-50 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        {/* Glow Effect */}
        <div className="absolute -inset-1 rounded-2xl bg-linear-to-br from-(--brand-red)/20 via-transparent to-gray-200/20 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />

        {/* Card Content */}
        <div className="relative z-10 flex h-full flex-col p-6">
          {/* Logo Container */}
          <div className="mb-6 flex items-center justify-center">
            <div className="relative h-24 w-full overflow-hidden rounded-xl bg-gray-50 p-4 transition-all duration-700 group-hover:bg-white group-hover:shadow-md">
              {logoUrl ? (
                <div className="relative h-full w-full">
                  <Image
                    src={logoUrl}
                    alt={reference.name}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Building2 className="h-12 w-12 text-gray-300 transition-colors duration-700 group-hover:text-(--brand-red)" />
                </div>
              )}
            </div>
          </div>

          {/* Company Name */}
          <h3 className="mb-3 text-left text-lg font-bold text-[#111] transition-colors duration-500 line-clamp-2 group-hover:text-(--brand-red)">
            {reference.name}
          </h3>

          {/* Description */}
          <p className="mb-4 grow text-left text-sm leading-relaxed text-[#666] line-clamp-3">
            {plainDescription}
          </p>

          {/* Bottom Section */}
          <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4 transition-colors duration-500 group-hover:border-(--brand-red)/20">
            {/* View Details (goes to detail page - default Link behavior) */}
            <div className="flex items-center gap-2 text-xs text-[#999] transition-colors duration-500 group-hover:text-(--brand-red)">
              <Eye className="h-3.5 w-3.5" />
                    <span className="font-medium">Detayları Gör</span>
            </div>
            
            {/* Visit Website (external link) */}
            {reference.websiteUrl && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(reference.websiteUrl, '_blank', 'noopener,noreferrer');
                }}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400 transition-all duration-500 hover:bg-(--brand-red) hover:text-white ${
                  isHovered ? "rotate-12 scale-110" : ""
                }`}
                aria-label="Visit Website"
              >
                <Globe className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Sparkle Effect on Hover */}
        <div
          className={`pointer-events-none absolute right-4 top-4 transition-all duration-700 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <Sparkles className="h-5 w-5 text-(--brand-red)" />
        </div>

        {/* Bottom Animated Line */}
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-(--brand-red) via-(--brand-red)/70 to-transparent transition-all duration-700 group-hover:w-full" />
      </Link>
    </div>
  );
}
