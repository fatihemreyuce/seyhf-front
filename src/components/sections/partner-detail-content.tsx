"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { PartnerResponse } from "@/types/partner.types";
import { Building2 } from "lucide-react";

interface PartnerDetailContentProps {
  partner: PartnerResponse;
}

export function PartnerDetailContent({ partner }: PartnerDetailContentProps) {
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

  return (
    <div ref={contentRef} className="space-y-8">
      {/* Partner Logo Card */}
      <div
        className={`stat-card-enter ${
          isVisible ? "visible" : ""
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-center bg-gray-50 p-12 md:p-16">
            {partner.logoUrl ? (
              <div className="relative h-48 w-full max-w-md">
                <Image
                  src={partner.logoUrl}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  unoptimized={partner.logoUrl.startsWith("http")}
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
    </div>
  );
}
