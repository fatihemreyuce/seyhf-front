"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BlogPageCard,
  type BlogPagePost,
} from "@/components/sections/blog-page-grid";
import { BlogSearch } from "@/components/sections/blog-search";

const SEARCH_DEBOUNCE_MS = 350;

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
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredPosts = useMemo(
    () => filterPostsByKeyword(posts, debouncedKeyword),
    [posts, debouncedKeyword],
  );

  useEffect(() => {
    const t = setTimeout(
      () => setDebouncedKeyword(keyword),
      SEARCH_DEBOUNCE_MS,
    );
    return () => clearTimeout(t);
  }, [keyword]);

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
    const n = filteredPosts.length;
    for (let i = 0; i < n; i++) {
      const el = refs.current[i];
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [filteredPosts.length]);

  return (
    <section className="bg-white">
      <div className="content-container py-16 md:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
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
                <p className="rounded-xl border border-gray-200 bg-gray-50 py-12 text-center text-[#666]">
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
