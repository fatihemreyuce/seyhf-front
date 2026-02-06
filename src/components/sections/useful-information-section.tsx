import Link from "next/link";
import { getUsefulInformation } from "@/services/server/useful-information-service";
import { UsefulInformationCard } from "./useful-information-card";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Lightbulb, Plus } from "lucide-react";

export async function UsefulInformationSection() {
  let usefulInfoData;

  try {
    const response = await getUsefulInformation(0, 6);
    usefulInfoData = response.content || [];
  } catch (error) {
    console.error("Failed to fetch useful information:", error);
    usefulInfoData = [];
  }

  if (usefulInfoData.length === 0) {
    return null;
  }

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-gray-50/80 to-white"
      aria-labelledby="useful-section-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        aria-hidden
        style={{
          backgroundImage: `linear-gradient(to right, var(--foreground) 1px, transparent 1px),
            linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="content-container relative py-16 md:py-20 lg:py-24">
        <AnimateOnScroll
          variant="from-top"
          className="mb-12 md:mb-16 text-center"
        >
          <p
            id="useful-section-heading"
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-red md:text-sm"
          >
            Faydalı Bilgiler
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Bilginizi <span className="text-brand-red">Artırmak</span> İçin
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-muted md:text-lg">
            Faydalı kaynakları, kılavuzları ve belgeleri keşfedin.
          </p>
        </AnimateOnScroll>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {usefulInfoData.slice(0, 3).map((info, index) => (
            <UsefulInformationCard key={info.id} info={info} index={index} />
          ))}
        </div>

        <AnimateOnScroll
          variant="from-bottom"
          className="mt-12 flex justify-center md:mt-16"
        >
          <Link
            href="/useful-information"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-8 py-4 text-base font-bold text-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 md:px-10 md:py-4 md:text-lg"
            style={{ backgroundColor: "var(--brand-red)" }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Tüm Faydalı Bilgileri Görüntüle
              <Plus
                className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:rotate-90"
                aria-hidden
              />
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-1/2 w-full -translate-x-1/2 origin-center scale-x-0 bg-white/20 transition-transform duration-350 ease-out group-hover:scale-x-100"
            />
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
