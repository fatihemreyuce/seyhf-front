"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ArrowRight, FileText } from "lucide-react";
import type { ServiceResponse } from "@/types/service.types";

interface ServiceDetailSidebarProps {
  services: ServiceResponse[];
  basePath?: string;
}

export function ServiceDetailSidebar({
  services,
  basePath = "",
}: ServiceDetailSidebarProps) {
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

  const [animatedServices, setAnimatedServices] = useState(services);
  const [isSearching, setIsSearching] = useState(false);

  // Animated filter with smooth transition
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      const filtered = services.filter((service) =>
        service.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
      setAnimatedServices(filtered);
      setTimeout(() => setIsSearching(false), 100);
    }, 400);

    return () => clearTimeout(timer);
  }, [debouncedSearchQuery, services]);

  const filteredServices = animatedServices;

  return (
    <div ref={sidebarRef} className="space-y-6">
      {/* Search Box */}
      <div
        className={`stat-card-enter sticky top-24 space-y-6 ${
          isVisible ? "visible" : ""
        }`}
      >
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-[#111]">Hizmet Ara</h3>
          <div className="relative">
            <input
              type="search"
              placeholder="Buradan arayın..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-4 pr-11 text-sm text-[#333] transition-colors placeholder:text-gray-400 focus:border-(--brand-red) focus:bg-white focus:outline-none focus:ring-2 focus:ring-(--brand-red)/20"
            />
            <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Services List */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-[#111]">
            Tüm Hizmetler
            <span className="ml-2 text-sm font-normal text-[#666]">
              ({filteredServices.length})
            </span>
          </h3>

          <div
            className={`space-y-2 transition-all duration-500 ${
              isSearching ? "scale-95 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <Link
                  key={service.id}
                  href={`${basePath}/services/${service.id}`}
                  className="blog-item-enter group flex items-center justify-between gap-3 rounded-lg border border-transparent px-3 py-2.5 text-sm text-[#555] transition-all hover:border-gray-100 hover:bg-gray-50"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 shrink-0 text-gray-400 transition-colors group-hover:text-(--brand-red)" />
                    <span className="line-clamp-1 transition-colors group-hover:text-[#111]">
                      {service.title}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-gray-300 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-(--brand-red) group-hover:opacity-100" />
                </Link>
              ))
            ) : (
              <div className="blog-item-enter py-4 text-center text-sm text-[#999]">
                Hizmet bulunamadı
              </div>
            )}
          </div>
        </div>

        {/* CTA Card */}
        <div className="rounded-2xl border border-(--brand-red)/20 bg-linear-to-br from-(--brand-red)/5 to-(--brand-red)/10 p-6">
          <h4 className="mb-2 text-lg font-bold text-[#111]">
            Özel Çözüme İhtiyacınız Var mı?
          </h4>
          <p className="mb-4 text-sm text-[#666]">
            Özel çözümler için ekibimizle iletişime geçin.
          </p>
          <Link
            href={`${basePath}/contact`}
            className="block w-full rounded-lg bg-(--brand-red) px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-(--brand-red)/90 hover:shadow-md"
          >
            İletişime Geç
          </Link>
        </div>
      </div>
    </div>
  );
}
