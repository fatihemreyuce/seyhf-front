"use client";

import { useEffect, useRef, useState } from "react";
import type { CircularResponse } from "@/types/circular.types";
import { FileText, Download, FileCheck2, Sparkles, BookOpen } from "lucide-react";

interface BlogDetailContentProps {
  blog: CircularResponse;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function BlogDetailContent({ blog }: BlogDetailContentProps) {
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

  const plainDescription = stripHtml(blog.description ?? "");

  return (
    <div ref={contentRef} className="space-y-8">
      {/* File Download Card */}
      {blog.fileUrl && (
        <div
          className={`stat-card-enter ${
            isVisible ? "visible" : ""
          }`}
        >
          <a
            href={blog.fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-2xl border-2 border-gray-100 bg-linear-to-br from-gray-50 via-white to-gray-50 p-6 shadow-sm transition-all duration-500 hover:border-(--brand-red)/30 hover:shadow-lg hover:shadow-(--brand-red)/10"
          >
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-(--brand-red) to-(--brand-red)/80 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Download className="h-8 w-8 text-white" />
              </div>
              
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <FileCheck2 className="h-5 w-5 text-(--brand-red)" />
                  <span className="text-sm font-semibold uppercase tracking-wide text-(--brand-red)">
                    Döküman Mevcut
                  </span>
                </div>
                <h3 className="mb-1 text-lg font-bold text-[#111] transition-colors duration-300 group-hover:text-(--brand-red)">
                  Dosyayı İndir veya Görüntüle
                </h3>
                <p className="text-sm text-[#666]">
                  PDF veya ilgili belgeyi indirmek için tıklayın
                </p>
              </div>

              <div className="hidden shrink-0 items-center justify-center rounded-xl bg-gray-100 px-4 py-2 transition-colors duration-300 group-hover:bg-(--brand-red) sm:flex">
                <Download className="h-5 w-5 text-gray-600 transition-colors duration-300 group-hover:text-white" />
              </div>
            </div>
          </a>
        </div>
      )}

      {/* Title Card */}
      <div
        className={`stat-card-enter stat-card-delay-1 ${
          isVisible ? "visible" : ""
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-linear-to-r from-(--brand-red)/5 to-transparent p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--brand-red)/10">
                <BookOpen className="h-5 w-5 text-(--brand-red)" />
              </div>
              <h2 className="text-xl font-bold text-[#111]">Makale Başlığı</h2>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-[#111]">
              {blog.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      {plainDescription && (
        <div
          className={`stat-card-enter stat-card-delay-2 ${
            isVisible ? "visible" : ""
          }`}
        >
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-linear-to-r from-gray-50 to-transparent p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                  <FileText className="h-5 w-5 text-[#555]" />
                </div>
                <h2 className="text-xl font-bold text-[#111]">İçerik</h2>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-base leading-relaxed text-[#555]">
                  {plainDescription}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!plainDescription && !blog.fileUrl && (
        <div
          className={`stat-card-enter ${
            isVisible ? "visible" : ""
          }`}
        >
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
            <Sparkles className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-lg text-[#666]">
              Bu makale için içerik bulunmamaktadır.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
