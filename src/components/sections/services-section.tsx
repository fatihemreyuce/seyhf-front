import { getServices } from "@/services/server/service-service";
import type { ServiceResponse } from "@/types/service.types";
import { ServicesCarousel } from "@/components/sections/services-carousel";

const FALLBACK_SERVICES: ServiceResponse[] = [
  {
    id: 1,
    categoryId: 1,
    title: "Content Writing",
    description:
      "Fusce convallis sem lorem ment. Phasellus oelou laoreet libero. Integer neque iaculis.",
    orderIndex: 1,
  },
  {
    id: 2,
    categoryId: 1,
    title: "Strategy & Marketing",
    description:
      "Fusce convallis sem lorem ment. Phasellus oelou laoreet libero. Integer neque iaculis.",
    orderIndex: 2,
  },
  {
    id: 3,
    categoryId: 1,
    title: "Strategy & Marketing",
    description:
      "Fusce convallis sem lorem ment. Phasellus oelou laoreet libero. Integer neque iaculis.",
    orderIndex: 3,
  },
  {
    id: 4,
    categoryId: 1,
    title: "Strategy & Marketing",
    description:
      "Fusce convallis sem lorem ment. Phasellus oelou laoreet libero. Integer neque iaculis.",
    orderIndex: 4,
  },
];

export async function ServicesSection() {
  const page = await getServices(0, 12);
  const services = (page?.content ?? [])
    .slice()
    .sort((a, b) => a.orderIndex - b.orderIndex);
  const display = services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <section className="bg-white">
      <div className="content-container py-16 md:py-20">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-subtle">
            Hizmet Listemiz
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text-primary md:text-4xl">
            SUNDUĞUMUZ <span className="text-brand-red">[HİZMETLER]</span>
          </h2>
        </div>

        <ServicesCarousel services={display} />
      </div>
    </section>
  );
}
