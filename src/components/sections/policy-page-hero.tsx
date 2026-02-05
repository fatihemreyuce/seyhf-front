import Link from "next/link";
import { ChevronRight, Home, FileText, Cookie } from "lucide-react";

const HERO_GRAY = "#8d929b";

type PolicyPageHeroProps = {
  title: string;
  variant: "privacy" | "cookie";
};

export function PolicyPageHero({ title, variant }: PolicyPageHeroProps) {
  const Icon = variant === "privacy" ? FileText : Cookie;
  const breadcrumbLabel = title;

  return (
    <section
      className="relative overflow-hidden py-12 md:py-16"
      style={{ backgroundColor: HERO_GRAY }}
      aria-labelledby="policy-hero-heading"
    >
      <div className="content-container relative z-10 flex flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 text-(--brand-red) shadow-sm">
          <Icon className="h-7 w-7" aria-hidden />
        </div>
        <h1
          id="policy-hero-heading"
          className="text-2xl font-bold tracking-tight text-[#282A2E] md:text-3xl"
        >
          {title}
        </h1>
        <nav
          className="mt-5 flex items-center gap-2 text-sm text-[#282A2E]/80"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-(--brand-red)"
          >
            <Home className="h-4 w-4" aria-hidden />
            Ana Sayfa
          </Link>
          <ChevronRight className="h-4 w-4 text-[#282A2E]/50" aria-hidden />
          <span className="inline-flex items-center gap-1.5 text-[#282A2E] font-medium">
            {breadcrumbLabel}
          </span>
        </nav>
      </div>
    </section>
  );
}
