import { Suspense } from "react";
import { fetchPartners } from "@/lib/api";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { PartnersCarousel } from "./partners-carousel";

/** Partner kartları: slider altında ana sayfada gösterilir. 4’lü kaydırmalı, noktaya basınca sayfa değişir. */
export async function PartnersSection() {
  const partners = await fetchPartners();

  return (
    <section className="relative bg-(--collbrai-dark)">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <span className="absolute left-[10%] top-[12%] h-2 w-2 rounded-full bg-(--collbrai-accent)" />
        <span className="absolute right-[28%] top-[18%] h-2 w-2 rounded-full bg-(--brand-red)" />
        <span className="absolute right-[12%] top-[14%] h-2 w-2 rounded-full bg-(--brand-red)" />
        <span className="absolute bottom-[22%] right-[18%] h-2 w-2 rounded-full bg-(--collbrai-accent-light)" />
        <span className="absolute bottom-[28%] left-[14%] h-2 w-2 rounded-full bg-(--collbrai-accent-light)" />
        <span className="absolute bottom-[14%] right-[8%] h-2 w-2 rounded-full bg-(--collbrai-accent-highlight)" />
      </div>

      <div className="content-container relative py-16 md:py-20">
        <AnimateOnScroll variant="from-top" className="mb-8 text-center">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-white md:text-3xl lg:text-4xl">
            BİRLİKTE ÇALIŞTIĞIMIZ{" "}
            <span className="text-(--collbrai-accent-light)">PARTNERLER</span>
          </h2>
        </AnimateOnScroll>

        <Suspense fallback={null}>
          <PartnersCarousel partners={partners} />
        </Suspense>
      </div>
    </section>
  );
}
