"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export interface ServiceCardProps {
  id?: number;
  title: string;
  description: string;
  href?: string;
  basePath?: string;
}

export function ServiceCard({ id, title, description, href, basePath = "" }: ServiceCardProps) {
  const plainDescription = stripHtml(description);
  const linkHref = href || (id ? `${basePath}/services/${id}` : "#");

  return (
    <Link
      href={linkHref}
      className="service-card group relative flex h-full w-full cursor-pointer flex-col items-center overflow-hidden rounded-2xl border border-gray-100 bg-white px-6 py-10 text-center shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
      aria-label={title}
    >
      <span aria-hidden className="service-card-corner" />

      <div className="mb-7 flex h-24 w-24 items-center justify-center rounded-2xl bg-linear-to-br from-gray-100 to-gray-200 transition-transform duration-500 group-hover:scale-110">
        <div className="h-12 w-12 rounded-lg bg-white/40" />
      </div>

      <h3 className="mb-4 text-lg font-bold leading-snug text-[#282A2E] transition-colors duration-300 group-hover:text-(--brand-red)">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-[#777] line-clamp-3">
        {plainDescription}
      </p>

      <ArrowRight className="mt-7 h-5 w-5 text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-(--brand-red)" />

      <span className="service-card-line" aria-hidden />
    </Link>
  );
}
