"use client";

import Link from "next/link";
import {
  FileText,
  BookOpen,
  Newspaper,
  FileCheck,
  ArrowRight,
  Download,
} from "lucide-react";
import { stripHtml } from "@/lib/utils";

export interface BlogPagePost {
  id: number;
  title: string;
  description?: string;
  fileUrl?: string;
  href: string;
}

const iconMap = [FileText, BookOpen, Newspaper, FileCheck, FileText, BookOpen];

function getFileTypeLabel(url: string): string {
  const ext = url.split(".").pop()?.toLowerCase() || "";
  const known: Record<string, string> = {
    pdf: "PDF",
    doc: "DOC",
    docx: "DOCX",
    xls: "XLS",
    xlsx: "XLSX",
    ppt: "PPT",
    pptx: "PPTX",
  };
  return known[ext] || (ext ? ext.toUpperCase() : "Dosya");
}

interface BlogPageCardProps {
  post: BlogPagePost;
  index?: number;
}

export function BlogPageCard({ post, index = 0 }: BlogPageCardProps) {
  const Icon = iconMap[index % iconMap.length];
  const plainDescription = post.description ? stripHtml(post.description) : "";

  const cardClasses =
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-gray-200 hover:shadow-xl";

  return (
    <div className={cardClasses}>
      {/* Tıklanınca detaya gider — aria-label ile erişilebilir */}
      <Link
        href={post.href}
        className="absolute inset-0 z-10"
        aria-label={`Makaleyi oku: ${post.title}`}
      />
      {/* Hover gradient */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-(--brand-red)/5 via-transparent to-gray-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-20 flex h-full flex-col pointer-events-none">
        {/* Icon & Badge */}
        <div className="mb-6 flex items-start justify-between">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-gray-100 to-gray-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:from-(--brand-red)/20 group-hover:to-(--brand-red)/10">
            <Icon className="h-8 w-8 text-[#555] transition-colors duration-300 group-hover:text-(--brand-red)" />
          </div>
          {post.fileUrl && (
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-[#666]">
              <Download className="h-3.5 w-3.5" />
              <span>{getFileTypeLabel(post.fileUrl)}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-3 text-xl font-bold text-[#111] transition-colors duration-300 group-hover:text-(--brand-red) line-clamp-2">
          {post.title}
        </h3>

        {/* Description */}
        {plainDescription && (
          <p className="mb-4 text-sm leading-relaxed text-[#666] line-clamp-3">
            {plainDescription}
          </p>
        )}

        {/* CTA */}
        <div className="mt-auto flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-(--brand-red) transition-all duration-300 group-hover:gap-3">
            Makaleyi Oku
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          {post.fileUrl && (
            <a
              href={post.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto relative z-30 inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-[#555] transition-colors hover:border-(--brand-red) hover:bg-(--brand-red)/5 hover:text-(--brand-red)"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="h-3.5 w-3.5" />
              Dosyayı İndir
            </a>
          )}
        </div>
      </div>
      {/* Bottom line */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-(--brand-red) to-(--brand-red)/70 transition-all duration-300 group-hover:w-full" />
    </div>
  );
}

export interface BlogPageGridProps {
  posts: BlogPagePost[];
}

export function BlogPageGrid({ posts }: BlogPageGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <BlogPageCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
}
