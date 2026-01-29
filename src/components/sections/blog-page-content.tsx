"use client";

import { useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    const t = setTimeout(
      () => setDebouncedKeyword(keyword),
      SEARCH_DEBOUNCE_MS,
    );
    return () => clearTimeout(t);
  }, [keyword]);

  const filteredPosts = useMemo(
    () => filterPostsByKeyword(posts, debouncedKeyword),
    [posts, debouncedKeyword],
  );

  return (
    <section className="bg-white">
      <div className="content-container py-10 md:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <BlogPageCard key={post.id} post={post} />
                ))
              ) : (
                <p className="rounded-xl border border-gray-200 bg-gray-50 py-12 text-center text-[#666]">
                  Arama kriterinize uygun blog bulunamadı.
                </p>
              )}
            </div>
          </div>
          <aside className="w-full shrink-0 lg:w-80">
            <BlogSearch value={keyword} onChange={setKeyword} />
          </aside>
        </div>
      </div>
    </section>
  );
}
