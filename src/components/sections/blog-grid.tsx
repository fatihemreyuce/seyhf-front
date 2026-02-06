"use client";

import Link from "next/link";
import Image from "next/image";
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

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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
  const plainDesc = post.description ? stripHtml(post.description) : "";
  const excerpt = plainDesc
    ? plainDesc.slice(0, 120) + (plainDesc.length > 120 ? "…" : "")
    : null;

  const imageZone = post.fileUrl ? (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
      <Image
        src={post.fileUrl}
        alt={post.title}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        unoptimized={post.fileUrl.startsWith("http")}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
    </div>
  ) : (
    <div className="blog-placeholder-animate relative flex aspect-16/10 w-full flex-col items-center justify-center overflow-hidden bg-linear-to-br from-gray-50 via-gray-100 to-gray-200/90">
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
      </div>
    </div>
  );

  return (
    <article
      className={cn(
        "group blog-card-hover-lift relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm",
        "transition-all duration-300 hover:border-brand-red/20 hover:shadow-xl",
      )}
    >
      {/* Üst vurgu çizgisi — hover'da görünür */}
      <span
        aria-hidden
        className="absolute left-0 right-0 top-0 z-[1] h-0.5 origin-center scale-x-0 bg-brand-red transition-transform duration-300 group-hover:scale-x-100"
      />

      {post.fileUrl ? (
        <Link
          href={post.href}
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-inset"
          aria-label={post.title}
        >
          {imageZone}
        </Link>
      ) : (
        <Link href={post.href} className="block" aria-label={post.title}>
          {imageZone}
        </Link>
      )}

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <Link
          href={post.href}
          className="mb-3 block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-lg -m-1 p-1"
        >
          <h3 className="text-base font-bold leading-snug text-text-primary line-clamp-2 transition-colors duration-300 group-hover:text-brand-red sm:text-lg">
            {post.title}
          </h3>
        </Link>
        {excerpt && (
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-text-muted">
            {excerpt}
          </p>
        )}

        <Link
          href={post.href}
          className="blog-card-read-btn mt-auto inline-flex w-fit items-center gap-2 rounded-lg bg-gray-50 px-4 py-2.5 text-sm font-semibold text-text-secondary transition-colors group-hover:bg-brand-red group-hover:text-white"
        >
          <span className="flex items-center gap-2">
            Detayı Görüntüle
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
