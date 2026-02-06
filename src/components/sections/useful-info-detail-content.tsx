"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { UsefulInformationResponse } from "@/types/useful.information";
import { ImageIcon, Sparkles, ChevronDown } from "lucide-react";

interface UsefulInfoDetailContentProps {
  info: UsefulInformationResponse;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function UsefulInfoDetailContent({ info }: UsefulInfoDetailContentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [contentExpanded, setContentExpanded] = useState(false);
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

  const plainExcerpt = stripHtml(info.excerpt);
  const plainDescription = stripHtml(info.description);

  return (
    <div ref={contentRef} className="space-y-8">
      {/* Image Card */}
      {info.fileUrl && (
        <div
          className={`stat-card-enter mx-auto max-w-2xl ${
            isVisible ? "visible" : ""
          }`}
        >
          <a
            href={info.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-xl border-2 border-gray-100 bg-white shadow-sm transition-all duration-500 hover:border-(--brand-red)/30 hover:shadow-lg hover:shadow-(--brand-red)/10"
          >
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-t-xl bg-gray-100">
              <Image
                src={info.fileUrl}
                alt={info.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 672px"
                unoptimized={info.fileUrl.startsWith("http")}
              />
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5">
              <ImageIcon className="h-4 w-4 shrink-0 text-(--brand-red)" />
              <span className="text-xs font-semibold text-[#111]">
                Resmi büyütmek için tıklayın
              </span>
            </div>
          </a>
        </div>
      )}

      {/* Excerpt */}
      <div
        className={`stat-card-enter stat-card-delay-1 ${
          isVisible ? "visible" : ""
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-lg leading-relaxed text-[#555]">
            {plainExcerpt}
          </p>
        </div>
      </div>

      {/* Main Description Card */}
      <div
        className={`stat-card-enter stat-card-delay-2 ${
          isVisible ? "visible" : ""
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="p-6 md:p-8">
            <div
              className={`prose prose-lg max-w-none overflow-hidden transition-all ${
                contentExpanded ? "max-h-none" : "max-h-[8.5rem]"
              }`}
            >
              <div className="whitespace-pre-wrap text-base leading-relaxed text-[#555]">
                {plainDescription}
              </div>
            </div>
            {plainDescription.length > 200 && (
              <button
                type="button"
                onClick={() => setContentExpanded((v) => !v)}
                className="mt-4 flex items-center gap-2 text-sm font-semibold text-(--brand-red) transition-colors hover:text-(--brand-red)/80"
              >
                {contentExpanded ? "Daha az göster" : "Detayı Görüntüle"}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    contentExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
