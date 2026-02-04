"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BlogPageCard,
  type BlogPagePost,
} from "@/components/sections/blog-page-grid";
import { BlogSearch } from "@/components/sections/blog-search";

const SEARCH_DEBOUNCE_MS = 800;

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
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [animatedPosts, setAnimatedPosts] = useState(posts);
  const [isSearching, setIsSearching] = useState(false);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredPosts = useMemo(
    () => filterPostsByKeyword(posts, debouncedKeyword),
    [posts, debouncedKeyword],
  );

  // Debounce search query with longer delay
  useEffect(() => {
    const t = setTimeout(
      () => setDebouncedKeyword(keyword),
      SEARCH_DEBOUNCE_MS,
    );
    return () => clearTimeout(t);
  }, [keyword]);

  // Animated filter with smooth transition
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setAnimatedPosts(filteredPosts);
      setTimeout(() => setIsSearching(false), 100);
    }, 400);

    return () => clearTimeout(timer);
  }, [filteredPosts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.getAttribute("data-blog-index");
          if (entry.isIntersecting && index != null)
            setVisibleIndices((prev) => new Set([...prev, Number(index)]));
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.1 },
    );
    const n = animatedPosts.length;
    for (let i = 0; i < n; i++) {
      const el = refs.current[i];
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [animatedPosts.length]);

  return (
    <section className="bg-white">
      <div className="content-container py-16 md:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          <div className="min-w-0 flex-1">
            <div 
              className={`flex flex-col gap-6 transition-all duration-500 ${
                isSearching ? "scale-95 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              {animatedPosts.length > 0 ? (
                animatedPosts.map((post, index) => (
                  <div
                    key={post.id}
                    ref={(el) => {
                      refs.current[index] = el;
                    }}
                    data-blog-index={index}
                    className={`blog-card-scroll-wrapper ${visibleIndices.has(index) ? "in-view" : ""}`}
                  >
                    <BlogPageCard post={post} index={index} />
                  </div>
                ))
              ) : (
                <p className="rounded-xl border border-gray-200 bg-gray-50 py-12 text-center text-text-light">
                  Arama kriterinize uygun blog bulunamadı.
                </p>
              )}
            </div>
          </div>
          <aside className="blog-search-sidebar-enter w-full shrink-0 lg:w-80">
            <BlogSearch value={keyword} onChange={setKeyword} />
          </aside>
        </div>
      </div>
    </section>
  );
}
