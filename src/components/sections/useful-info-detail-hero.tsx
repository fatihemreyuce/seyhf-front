import Link from "next/link";
import { ChevronRight, Home, Lightbulb, FileText } from "lucide-react";

interface UsefulInfoDetailHeroProps {
  title: string;
  basePath?: string;
}

export function UsefulInfoDetailHero({ title, basePath = "" }: UsefulInfoDetailHeroProps) {
  const rootHref = basePath || "/";
  const infoHref = basePath ? `${basePath}/useful-information` : "/useful-information";

  return (
    <section
      className="relative overflow-hidden border-b border-white/10 bg-linear-to-b from-gray-900 via-gray-900 to-gray-950 py-12 md:py-16"
      aria-labelledby="useful-info-detail-hero-heading"
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
          <Lightbulb className="h-7 w-7" aria-hidden />
        </div>
        <h1
          id="useful-info-detail-hero-heading"
          className="text-2xl font-bold tracking-tight text-white md:text-3xl line-clamp-2"
        >
          {title}
        </h1>
        <nav
          className="mt-5 flex flex-wrap items-center justify-start gap-2 text-sm text-white/80"
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
          <Link
            href={infoHref}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <Lightbulb className="h-4 w-4" aria-hidden />
            Faydalı Bilgiler
          </Link>
          <ChevronRight className="h-4 w-4 text-white/50" aria-hidden />
          <span className="inline-flex items-center gap-1.5 text-white line-clamp-1">
            <FileText className="h-4 w-4" aria-hidden />
            {title}
          </span>
        </nav>
      </div>
    </section>
  );
}
