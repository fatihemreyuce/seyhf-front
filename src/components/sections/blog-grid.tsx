"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
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
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </AnimateOnScroll>
  );
}

function BlogCard({ post }: { post: BlogCardItem }) {
  const pdfZone = (
    <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center overflow-hidden bg-gray-200">
      <span
        aria-hidden
        className="absolute inset-0 bg-[#EFE0E0] transition-[clip-path] duration-700 ease-out [clip-path:inset(50%_50%_50%_50%)] group-hover:[clip-path:inset(0%_0%_0%_0%)]"
      />
      <FileText className="relative z-10 h-12 w-12 text-gray-400 transition-colors duration-500 group-hover:text-[#c4a0a0] sm:h-14 sm:w-14" />
      <span className="relative z-10 mt-1.5 text-xs font-medium uppercase tracking-wider text-gray-400 transition-colors duration-500 group-hover:text-[#b09090]">
        PDF
      </span>
    </div>
  );

  return (
    <Card
      className={cn(
        "group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm",
        "transition-shadow duration-500 ease-out hover:shadow-lg",
      )}
    >
      {post.fileUrl ? (
        <a
          href={post.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          title="Dosyayı İndir"
        >
          {pdfZone}
        </a>
      ) : (
        pdfZone
      )}
      <Link href={post.href} className="block space-y-1.5 p-3">
        <h3 className="text-base font-bold leading-snug text-[#282A2E] transition-colors duration-500 group-hover:text-[#ED3237]">
          {post.title}
        </h3>
        <span className="inline-block text-sm font-medium text-[#282A2E] transition-colors duration-500 group-hover:text-[#ED3237]">
          Read More +
        </span>
      </Link>
    </Card>
  );
}
