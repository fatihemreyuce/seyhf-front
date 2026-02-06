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
      className="service-card group relative flex h-full w-full cursor-pointer flex-col items-start overflow-hidden rounded-2xl border border-gray-100 bg-white px-6 py-10 text-left shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
      aria-label={title}
    >
      <span aria-hidden className="service-card-corner" />

      <h3 className="mb-4 text-lg font-bold leading-snug text-text-secondary transition-colors duration-300 group-hover:text-(--brand-red) w-full">
        {title}
      </h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-text-lighter line-clamp-3">
        {plainDescription}
      </p>

      <ArrowRight className="mt-auto h-5 w-5 self-end text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-(--brand-red)" />

      <span className="service-card-line" aria-hidden />
    </Link>
  );
}
