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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </AnimateOnScroll>
  );
}

function BlogCard({ post }: { post: BlogCardItem }) {
  const pdfZone = (
    <div className="relative flex aspect-4/3 w-full flex-col items-center justify-center overflow-hidden bg-gray-200">
      <span
        aria-hidden
        className="absolute inset-0 bg-[#EFE0E0] [clip-path:circle(0%_at_50%_50%)] [transition:clip-path_0.5s_ease-out] group-hover:[clip-path:circle(150%_at_50%_50%)]"
      />
      <FileText className="relative z-10 h-14 w-14 text-gray-400 transition-colors duration-500 group-hover:text-[#c4a0a0] sm:h-16 sm:w-16" />
      <span className="relative z-10 mt-2 text-xs font-medium uppercase tracking-wider text-gray-400 transition-colors duration-500 group-hover:text-[#b09090]">
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
      <Link href={post.href} className="block space-y-3 p-5">
        <h3 className="text-lg font-bold leading-snug text-[#282A2E] transition-colors duration-500 group-hover:text-[#ED3237]">
          {post.title}
        </h3>
        <span className="inline-block text-sm font-medium text-[#282A2E] transition-colors duration-500 group-hover:text-[#ED3237]">
          Read More +
        </span>
      </Link>
    </Card>
  );
}
