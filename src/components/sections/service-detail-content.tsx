"use client";

import { useEffect, useRef, useState } from "react";
import type { ServiceResponse } from "@/types/service.types";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

interface ServiceDetailContentProps {
  service: ServiceResponse;
}

export function ServiceDetailContent({ service }: ServiceDetailContentProps) {
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

  const plainDescription = stripHtml(service.description);

  return (
    <div ref={contentRef} className="space-y-8">
      {/* Service Title */}
      <div
        className={`stat-card-enter ${
          isVisible ? "visible" : ""
        }`}
      >
        <h2 className="text-3xl font-extrabold text-[#111] md:text-4xl">
          {service.title}
        </h2>
      </div>

      {/* Service Description */}
      <div
        className={`stat-card-enter stat-card-delay-1 ${
          isVisible ? "visible" : ""
        }`}
      >
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <p className="whitespace-pre-wrap text-lg leading-relaxed text-[#555]">
            {plainDescription}
          </p>
        </div>
      </div>
    </div>
  );
}
