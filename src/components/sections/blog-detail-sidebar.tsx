"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  FileText,
  Mail,
  Phone,
  BookOpen,
  Loader2,
} from "lucide-react";
import type { CircularResponse } from "@/types/circular.types";

interface BlogDetailSidebarProps {
  blogs: CircularResponse[];
  basePath?: string;
}

export function BlogDetailSidebar({
  blogs,
  basePath = "",
}: BlogDetailSidebarProps) {
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
      { threshold: 0.2, rootMargin: "-50px" },
    );

    if (sidebarRef.current) {
      observer.observe(sidebarRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const [animatedBlogs, setAnimatedBlogs] = useState(blogs);
  const [isSearching, setIsSearching] = useState(false);

  // Animated filter with smooth transition
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      const filtered = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
      );
      setAnimatedBlogs(filtered);
      setTimeout(() => setIsSearching(false), 100);
    }, 400);

    return () => clearTimeout(timer);
  }, [debouncedSearchQuery, blogs]);

  const filteredBlogs = animatedBlogs;

  return (
    <div ref={sidebarRef} className="space-y-6">
      {/* Search Box */}
      <div
        className={`stat-card-enter space-y-6 lg:sticky lg:top-24 ${
          isVisible ? "visible" : ""
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-linear-to-r from-gray-50 to-transparent p-5">
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#111]">
              <Search className="h-5 w-5 text-(--brand-red)" />
              Blog Ara
            </h3>
          </div>
          <div className="p-5">
            <div className="relative">
              <input
                type="search"
                placeholder="Buradan arayın..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 py-3 pl-4 pr-11 text-sm text-[#333] transition-all duration-300 placeholder:text-gray-400 focus:border-(--brand-red) focus:bg-white focus:outline-none focus:ring-2 focus:ring-(--brand-red)/20"
              />
              <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Related Blogs List */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-linear-to-r from-gray-50 to-transparent p-5">
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#111]">
              <BookOpen className="h-5 w-5 text-(--brand-red)" />
              İlgili Bloglar
              <span className="ml-auto text-sm font-normal text-[#666]">
                ({filteredBlogs.length})
              </span>
            </h3>
          </div>

          <div className="relative min-h-[120px] max-h-96 overflow-y-auto p-3">
            {isSearching && (
              <div
                className="absolute inset-0 z-10 flex items-center justify-center py-8"
                aria-hidden
              >
                <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
              </div>
            )}
            <div
              className={`space-y-1 transition-all duration-500 ${
                isSearching
                  ? "pointer-events-none scale-95 opacity-0"
                  : "scale-100 opacity-100"
              }`}
            >
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog, index) => (
                  <Link
                    key={blog.id}
                    href={`${basePath}/blog/${blog.id}`}
                    className="blog-item-enter group flex items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-3 text-sm transition-all hover:border-gray-100 hover:bg-gray-50"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <FileText className="h-4 w-4 shrink-0 text-gray-400 transition-colors group-hover:text-(--brand-red)" />
                      <span className="line-clamp-2 transition-colors group-hover:text-[#111]">
                        {blog.title}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-gray-300 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-(--brand-red) group-hover:opacity-100" />
                  </Link>
                ))
              ) : (
                <div className="blog-item-enter py-8 text-center text-sm text-[#999]">
                  Blog bulunamadı
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="overflow-hidden rounded-2xl border-2 border-(--brand-red)/20 bg-linear-to-br from-(--brand-red)/5 via-white to-(--brand-red)/10 shadow-sm">
          <div className="p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-(--brand-red)/10">
              <Mail className="h-6 w-6 text-(--brand-red)" />
            </div>
            <h4 className="mb-2 text-lg font-bold text-[#111]">Güncel Kalın</h4>
            <p className="mb-4 text-sm leading-relaxed text-[#666]">
              En son haberleri ve güncellemeleri almak ister misiniz? Bilgi
              sahibi olmak için bizimle iletişime geçin.
            </p>
            <Link
              href={`${basePath}/contact`}
              className="block w-full rounded-xl bg-(--brand-red) px-4 py-5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-(--brand-red)/90 hover:shadow-md xs:py-6"
            >
              İletişime Geç
            </Link>
          </div>
        </div>

        {/* Quick Contact Info */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="p-5">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#999]">
              Hızlı İletişim
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:info@example.com"
                className="group flex items-center gap-3 text-sm text-[#666] transition-colors hover:text-(--brand-red)"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 transition-colors group-hover:bg-(--brand-red)/10">
                  <Mail className="h-4 w-4 transition-colors group-hover:text-(--brand-red)" />
                </div>
                <span>info@example.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="group flex items-center gap-3 text-sm text-[#666] transition-colors hover:text-(--brand-red)"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 transition-colors group-hover:bg-(--brand-red)/10">
                  <Phone className="h-4 w-4 transition-colors group-hover:text-(--brand-red)" />
                </div>
                <span>+1 (234) 567-890</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
