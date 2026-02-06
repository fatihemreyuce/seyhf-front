import Link from "next/link";
import { ChevronRight, Home, Newspaper } from "lucide-react";

interface BlogPageHeroProps {
  basePath?: string;
}

export function BlogPageHero({ basePath = "" }: BlogPageHeroProps) {
  const rootHref = basePath ? `${basePath}/` : "/";
  const blogHref = basePath ? `${basePath}/blog` : "/blog";

  return (
    <section
      className="relative overflow-hidden border-b border-white/10 bg-linear-to-b from-gray-900 via-gray-900 to-gray-950 py-12 md:py-16"
      aria-labelledby="blog-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(43, 97, 214, 0.25), transparent)`,
        }}
      />
      <div className="content-container relative z-10 flex flex-col items-start justify-center text-left">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white">
          <Newspaper className="h-7 w-7" aria-hidden />
        </div>
        <h1
          id="blog-hero-heading"
          className="text-2xl font-bold tracking-tight text-white md:text-3xl"
        >
          Blog
        </h1>
        <p className="mt-1 text-sm text-white/70">
          Güncel yazılarımızı, bloglarımızı ve sirkülerlerimizi keşfedin
        </p>
        <nav
          className="mt-5 flex items-center justify-start gap-2 text-sm text-white/80"
          aria-label="Breadcrumb"
        >
          <Link
            href={rootHref}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <Home className="h-4 w-4" aria-hidden />
            Ana Sayfa
          </Link>
          <ChevronRight className="h-4 w-4 text-white/50" aria-hidden />
          <span className="inline-flex items-center gap-1.5 text-white">
            <Newspaper className="h-4 w-4" aria-hidden />
            Blog
          </span>
        </nav>
      </div>
    </section>
  );
}
