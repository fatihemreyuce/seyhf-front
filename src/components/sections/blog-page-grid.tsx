"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface BlogPagePost {
  id: number;
  title: string;
  description?: string;
  fileUrl?: string;
  href: string;
}

/** HTML etiketlerini kaldırıp düz metin döndürür */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function BlogPageCard({
  post,
  index = 0,
}: {
  post: BlogPagePost;
  index?: number;
}) {
  const plainDescription = post.description ? stripHtml(post.description) : "";
  const delayClass =
    index <= 8 ? `blog-card-enter-delay-${index}` : "blog-card-enter-delay-8";

  const fileZone = (
    <div className="relative flex h-full min-h-[180px] w-full flex-col items-center justify-center overflow-hidden bg-[#e0e0e0] sm:min-h-0">
      {/* Hover: içeriden dışarı kare şeklinde büyüyen animasyon */}
      <span
        aria-hidden
        className="absolute inset-0 bg-[#EFE0E0] transition-[clip-path] duration-500 ease-out [clip-path:inset(50%_50%_50%_50%)] group-hover:[clip-path:inset(0%_0%_0%_0%)]"
      />
      <FileText className="relative z-10 h-14 w-14 text-gray-500 transition-colors duration-500 group-hover:text-[#c4a0a0] sm:h-16 sm:w-16" />
      <span className="relative z-10 mt-2 text-xs font-medium uppercase tracking-wider text-gray-500 transition-colors duration-500 group-hover:text-[#b09090]">
        PDF
      </span>
    </div>
  );

  return (
    <Card
      className={`group blog-card-enter blog-card-hover-lift ${delayClass} flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:flex-row`}
    >
      {post.fileUrl ? (
        <a
          href={post.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex self-stretch sm:min-w-[300px] sm:max-w-[440px]"
          title="Dosyayı İndir"
        >
          {fileZone}
        </a>
      ) : (
        <Link
          href={post.href}
          className="flex self-stretch sm:min-w-[300px] sm:max-w-[440px]"
        >
          {fileZone}
        </Link>
      )}

      <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
        <h3 className="mb-3 text-lg font-bold leading-snug text-[#333] transition-colors duration-500 group-hover:text-[#ED3237] line-clamp-2 md:text-xl">
          {post.title}
        </h3>
        {plainDescription && (
          <p className="mb-4 text-[#666] line-clamp-2 text-sm leading-relaxed md:text-base">
            {plainDescription}
          </p>
        )}
        <Link
          href={post.href}
          className="blog-read-more-link mt-auto inline-block text-sm font-medium text-[#777] hover:text-(--brand-red)"
        >
          Read More +
        </Link>
      </div>
    </Card>
  );
}

export interface BlogPageGridProps {
  posts: BlogPagePost[];
}

export function BlogPageGrid({ posts }: BlogPageGridProps) {
  return (
    <section className="bg-white">
      <div className="content-container py-10 md:py-14">
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <BlogPageCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
