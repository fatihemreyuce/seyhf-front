"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {
  BlogPageCard,
  type BlogPagePost,
} from "@/components/sections/blog-page-grid";
import { Search, Filter, Loader2 } from "lucide-react";

export interface BlogPageContentProps {
  posts: BlogPagePost[];
}

function filterPostsByKeyword(
  posts: BlogPagePost[],
  keyword: string,
): BlogPagePost[] {
  const q = keyword.trim().toLowerCase();
  if (!q) return posts;
  return posts.filter((post) => {
    const titleMatch = post.title?.toLowerCase().includes(q);
    const descMatch = post.description?.toLowerCase().includes(q);
    return titleMatch || descMatch;
  });
}

export function BlogPageContent({ posts }: BlogPageContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [animatedPosts, setAnimatedPosts] = useState(posts);
  const [isSearching, setIsSearching] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    search: false,
    grid: false,
  });

  const searchRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredPosts = useMemo(
    () => filterPostsByKeyword(posts, debouncedSearchQuery),
    [posts, debouncedSearchQuery],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setAnimatedPosts(filteredPosts);
      setTimeout(() => setIsSearching(false), 100);
    }, 300);
    return () => clearTimeout(timer);
  }, [filteredPosts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === searchRef.current) {
              setVisibleSections((prev) => ({ ...prev, search: true }));
            } else if (entry.target === gridRef.current) {
              setVisibleSections((prev) => ({ ...prev, grid: true }));
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "-50px" },
    );

    if (searchRef.current) observer.observe(searchRef.current);
    if (gridRef.current) observer.observe(gridRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="content-container">
        {/* Search Bar - Top, Full Width */}
        <div
          ref={searchRef}
          className={`stat-card-enter relative mb-8 ${
            visibleSections.search ? "visible" : ""
          }`}
        >
          <div className="relative w-full">
            <input
              id="blog-page-search"
              type="search"
              placeholder="Başlık veya açıklamaya göre ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border-2 border-gray-200 bg-white py-4 pl-6 pr-14 text-[#333] shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-(--brand-red) focus:outline-none focus:ring-4 focus:ring-(--brand-red)/10"
              aria-label="Blog arama"
            />
            <label
              htmlFor="blog-page-search"
              className="search-icon-focusable absolute right-5 top-1/2 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center"
            >
              <Search className="h-6 w-6 text-gray-400" />
            </label>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 px-6 py-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-(--brand-red)" />
            <span className="text-sm font-semibold text-[#666]">
              {posts.length} yazıdan {animatedPosts.length} tanesi gösteriliyor
            </span>
          </div>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="relative min-h-[200px]">
          {isSearching && (
            <div
              className="absolute inset-0 z-10 flex min-h-[200px] items-center justify-center bg-white/90 py-12 backdrop-blur-sm"
              aria-hidden
            >
              <Loader2 className="h-10 w-10 animate-spin text-brand-red" />
            </div>
          )}
          {animatedPosts.length > 0 ? (
            <div
              className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-500 ${
                isSearching
                  ? "pointer-events-none scale-95 opacity-0"
                  : "scale-100 opacity-100"
              }`}
            >
              {animatedPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`stat-card-enter stat-card-delay-${index % 3} ${
                    visibleSections.grid ? "visible" : ""
                  }`}
                >
                  <BlogPageCard post={post} index={index} />
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`rounded-2xl border border-gray-100 bg-gray-50 py-20 text-center transition-opacity ${
                isSearching ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-200">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#333]">
                Sonuç bulunamadı
              </h3>
              <p className="mb-6 text-[#666]">
                Arama kriterinize uygun yazı bulunamadı. Farklı anahtar
                kelimeler deneyin.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="rounded-xl bg-(--brand-red) px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-(--brand-red)/90 hover:shadow-md"
              >
                Aramayı Temizle
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
