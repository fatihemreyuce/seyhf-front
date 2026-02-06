import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Info,
  Sparkles,
  BookOpen,
  Target,
  ArrowRight,
  Quote,
} from "lucide-react";
import { getHomepageAbout } from "@/services/server/homepage-about-service";
import type { HomepageAboutResponse } from "@/types/homepage.about.types";
import { stripHtml } from "@/lib/utils";

export async function HomepageAboutSection() {
  let aboutData: HomepageAboutResponse | null = null;

  try {
    const page = await getHomepageAbout(0, 1);
    const first = page?.content?.[0];
    if (first) aboutData = first;
  } catch (error) {
    console.error("Failed to fetch homepage about:", error);
  }

  if (!aboutData) {
    return null;
  }

  const { leftTitle, leftDescription, rightTitle, rightDescription } =
    aboutData;

  return (
    <section className="bg-linear-to-b from-gray-50/50 to-white py-16 md:py-20">
      <div className="content-container">
        <div className="mb-10 text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-(--brand-red)/10">
            <Info className="h-8 w-8 text-(--brand-red)" />
          </div>
          <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-subtle">
            <Sparkles className="h-4 w-4 text-(--brand-red)" aria-hidden />
            Hakkımızda
            <Sparkles className="h-4 w-4 text-(--brand-red)" aria-hidden />
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text-primary md:text-4xl">
            BİZ KİMİZ?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          <div className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-colors hover:border-(--brand-red)/20 md:p-8">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-(--brand-red)/10 text-(--brand-red) transition-colors group-hover:bg-(--brand-red)/15">
              <BookOpen className="h-6 w-6" aria-hidden />
            </div>
            <h3 className="flex items-center gap-2 text-xl font-bold text-text-primary md:text-2xl">
              {stripHtml(leftTitle)}
            </h3>
            <p className="mt-4 flex gap-2 text-base leading-relaxed text-text-light md:text-lg">
              <Quote
                className="mt-1 h-5 w-5 shrink-0 text-(--brand-red)/50"
                aria-hidden
              />
              <span>{stripHtml(leftDescription)}</span>
            </p>
          </div>
          <div className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-colors hover:border-(--brand-red)/20 md:p-8">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-(--brand-red)/10 text-(--brand-red) transition-colors group-hover:bg-(--brand-red)/15">
              <Target className="h-6 w-6" aria-hidden />
            </div>
            <h3 className="flex items-center gap-2 text-xl font-bold text-text-primary md:text-2xl">
              {stripHtml(rightTitle)}
            </h3>
            <p className="mt-4 flex gap-2 text-base leading-relaxed text-text-light md:text-lg">
              <Quote
                className="mt-1 h-5 w-5 shrink-0 text-(--brand-red)/50"
                aria-hidden
              />
              <span>{stripHtml(rightDescription)}</span>
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button asChild className="mt-8 gap-2">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2"
            >
              Hakkımızda
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
