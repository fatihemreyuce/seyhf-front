"use client";

import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { cn } from "@/lib/utils";

export interface BlogCardItem {
  id: number;
  title: string;
  description?: string;
  fileUrl?: string;
  href: string;
}

export function BlogGrid({ posts }: { posts: BlogCardItem[] }) {
  return (
    <AnimateOnScroll variant="from-bottom">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {posts.slice(0, 3).map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </AnimateOnScroll>
  );
}

function BlogCard({ post, index }: { post: BlogCardItem; index?: number }) {
  const pdfZone = (
    <div className="blog-placeholder-animate relative flex aspect-16/10 w-full flex-col items-center justify-center overflow-hidden bg-linear-to-br from-gray-50 via-gray-100 to-gray-200/90">
      {/* Hafif desen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.06) 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-(--brand-red)/10 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
      />
      <div className="blog-placeholder-icon-wrap relative z-10 flex flex-col items-center gap-3">
        <div className="rounded-2xl border border-gray-200/60 bg-white/95 p-5 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-(--brand-red)/20 group-hover:shadow-md">
          <FileText
            className="h-11 w-11 text-gray-400 transition-colors duration-300 group-hover:text-(--brand-red) sm:h-12 sm:w-12"
            strokeWidth={1.25}
          />
        </div>
        <span className="rounded-full bg-gray-200/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gray-600">
          PDF
        </span>
      </div>
    </div>
  );

  return (
    <article
      className={cn(
        "group blog-card-hover-lift relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm",
        "transition-all duration-300 hover:border-(--brand-red)/15 hover:shadow-xl hover:shadow-gray-200/50"
      )}
    >
      {/* Üst vurgu çizgisi — hover'da görünür */}
      <span
        aria-hidden
        className="absolute left-0 right-0 top-0 z-1 h-0.5 origin-center scale-x-0 bg-(--brand-red) transition-transform duration-300 group-hover:scale-x-100"
      />

      {post.fileUrl ? (
        <a
          href={post.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-red) focus-visible:ring-inset"
          title="Dosyayı İndir"
        >
          {pdfZone}
        </a>
      ) : (
        <div className="block">{pdfZone}</div>
      )}

      <div className="relative flex flex-1 flex-col border-t border-gray-100 p-5 sm:p-6">
        <Link
          href={post.href}
          className="mb-4 block focus:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-red) focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-lg -m-1 p-1"
        >
          <h3 className="text-base font-bold leading-snug text-text-primary line-clamp-2 transition-colors duration-300 group-hover:text-(--brand-red) sm:text-lg">
            {post.title}
          </h3>
        </Link>

        <Link
          href={post.href}
          className="blog-card-read-btn mt-auto inline-flex w-fit items-center gap-2 rounded-xl border-2 border-gray-200 bg-gray-50/80 px-4 py-3 text-sm font-semibold text-text-secondary"
        >
          <span aria-hidden className="blog-card-read-btn-fill rounded-xl" />
          <span className="blog-card-read-btn-text flex items-center gap-2">
            Makaleyi Oku
            <ArrowRight
              className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </Link>
      </div>
    </article>
  );
}
