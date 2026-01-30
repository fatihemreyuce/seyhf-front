"use client";

import { useEffect, useRef, useState } from "react";
import type { ServiceResponse } from "@/types/service.types";
import {
  Users,
  Clock,
  Target,
  CheckCircle2,
  Sparkles,
  TrendingUp,
} from "lucide-react";

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

  // Service stats from backend
  const stats = [
    {
      icon: Target,
      label: "Service ID",
      value: `#${service.id}`,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Users,
      label: "Category",
      value: service.categoryId.toString(),
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Sparkles,
      label: "Order",
      value: service.orderIndex.toString(),
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const features = [
    "Professional and experienced team",
    "High quality service delivery",
    "24/7 customer support",
    "Competitive pricing",
    "Fast turnaround time",
    "Satisfaction guaranteed",
  ];

  return (
    <div ref={contentRef} className="space-y-10">
      {/* Service Info Cards */}
      <div
        className={`stat-card-enter grid grid-cols-1 gap-4 sm:grid-cols-3 ${
          isVisible ? "visible" : ""
        }`}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`stat-card-delay-${index} group stat-card-enter ${
              isVisible ? "visible" : ""
            } overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg`}
          >
            <div
              className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor} transition-transform duration-500 group-hover:scale-110`}
            >
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-[#111]">{stat.value}</div>
            <div className="mt-1 text-sm text-[#666]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Description */}
      <div
        className={`stat-card-enter stat-card-delay-1 space-y-6 ${
          isVisible ? "visible" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--brand-red)/10">
            <Sparkles className="h-5 w-5 text-(--brand-red)" />
          </div>
          <h2 className="text-2xl font-bold text-[#111]">About This Service</h2>
        </div>

        <p className="leading-relaxed text-[#555]">{plainDescription}</p>
      </div>

      {/* Features Grid */}
      <div
        className={`stat-card-enter stat-card-delay-2 ${
          isVisible ? "visible" : ""
        }`}
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-[#111]">Key Features</h3>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 transition-colors hover:border-green-200 hover:bg-green-50/30"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
              <span className="text-sm text-[#555]">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
