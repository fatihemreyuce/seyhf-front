"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ReferenceResponse } from "@/types/references.types";
import { Building2, Globe, ExternalLink } from "lucide-react";

interface ReferenceDetailContentProps {
  reference: ReferenceResponse;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function ReferenceDetailContent({
  reference,
}: ReferenceDetailContentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: "-50px" }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const plainDescription = stripHtml(reference.description);
  
  // Fix SSL issue with localhost
  const logoUrl = reference.logoUrl?.replace(/^https:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, "http://$1$2") || null;

  return (
    <div ref={contentRef} className="space-y-8">
      {/* Logo Card */}
      <div
        className={`stat-card-enter ${isVisible ? "visible" : ""}`}
      >
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-center bg-gray-50 p-12 md:p-16">
            {logoUrl ? (
              <div className="relative h-48 w-full max-w-md">
                <Image
                  src={logoUrl}
                  alt={reference.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            ) : (
              <div className="flex h-48 w-full max-w-md items-center justify-center rounded-2xl bg-linear-to-br from-gray-200 to-gray-300">
                <Building2 className="h-24 w-24 text-gray-400" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Company Info Card */}
      <div
        className={`stat-card-enter stat-card-delay-1 ${
          isVisible ? "visible" : ""
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="p-6 md:p-8">
            <p className="whitespace-pre-wrap text-base leading-relaxed text-[#666]">
              {plainDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Website Card */}
      {reference.websiteUrl && (
        <div
          className={`stat-card-enter stat-card-delay-2 ${
            isVisible ? "visible" : ""
          }`}
        >
          <a
            href={reference.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-2xl border-2 border-gray-100 bg-linear-to-br from-gray-50 via-white to-gray-50 p-6 shadow-sm transition-all duration-500 hover:border-(--brand-red)/30 hover:shadow-lg hover:shadow-(--brand-red)/10"
          >
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-(--brand-red) to-(--brand-red)/80 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Globe className="h-8 w-8 text-white" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-(--brand-red)" />
                  <span className="text-sm font-semibold uppercase tracking-wide text-(--brand-red)">
                    Web Sitesini Ziyaret Et
                  </span>
                </div>
                <h3 className="mb-1 text-lg font-bold text-[#111] transition-colors duration-300 group-hover:text-(--brand-red)">
                  {reference.websiteUrl}
                </h3>
                <p className="text-sm text-[#666]">
                  Click to visit the official website
                </p>
              </div>

              <div className="hidden shrink-0 items-center justify-center rounded-xl bg-gray-100 px-4 py-2 transition-colors duration-300 group-hover:bg-(--brand-red) sm:flex">
                <ExternalLink className="h-5 w-5 text-gray-600 transition-colors duration-300 group-hover:text-white" />
              </div>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}
