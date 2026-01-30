"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { UsefulInformationResponse } from "@/types/useful.information";
import { 
  FileText, 
  BookOpen, 
  Info, 
  Sparkles,
  FileCheck,
  FileSpreadsheet
} from "lucide-react";

interface UsefulInformationCardProps {
  info: UsefulInformationResponse;
  index: number;
  basePath?: string;
}

// Icon mapper for variety
const iconMap = [FileText, BookOpen, Info, Sparkles, FileCheck, FileSpreadsheet];

// Strip HTML tags from text
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function UsefulInformationCard({ info, index, basePath = "" }: UsefulInformationCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.2, rootMargin: "-50px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const Icon = iconMap[index % iconMap.length];
  const plainExcerpt = stripHtml(info.excerpt);
  const plainDescription = stripHtml(info.description);

  return (
    <div
      ref={cardRef}
      className={`stat-card-enter stat-card-delay-${index % 3} group ${
        isVisible ? "visible" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`${basePath}/useful-information/${info.id}`}
        className="relative block h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:border-gray-200"
      >
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-linear-to-br from-(--brand-red)/5 via-transparent to-gray-100 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col">
          {/* Icon */}
          <div className="mb-6">
            <div 
              className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-gray-100 to-gray-200 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 group-hover:from-(--brand-red)/20 group-hover:to-(--brand-red)/10 ${
                isHovered ? "shadow-lg" : ""
              }`}
            >
              <Icon 
                className={`h-8 w-8 text-[#555] transition-all duration-700 group-hover:text-(--brand-red) ${
                  isHovered ? "scale-110" : ""
                }`} 
              />
            </div>
          </div>

          {/* Title */}
          <h3 className="mb-3 text-xl font-bold text-[#111] transition-colors duration-500 group-hover:text-(--brand-red)">
            {info.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-4 text-sm leading-relaxed text-[#666]">
            {plainExcerpt}
          </p>

          {/* Description */}
          <p className="grow text-xs leading-relaxed text-[#999] line-clamp-3">
            {plainDescription}
          </p>

          {/* Decorative corner element */}
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-linear-to-br from-(--brand-red)/10 to-(--brand-red)/5 opacity-0 blur-2xl transition-all duration-700 group-hover:translate-x-6 group-hover:-translate-y-6 group-hover:opacity-100" />
        </div>

        {/* Bottom animated line */}
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-(--brand-red) to-(--brand-red)/70 transition-all duration-700 group-hover:w-full" />
      </Link>
    </div>
  );
}
