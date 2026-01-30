import { ServicePageHero } from "@/components/sections/service-page-hero";
import { ServicePageContent } from "@/components/sections/service-page-content";
import { getServices } from "@/services/server/service-service";
import { getServiceCategories } from "@/services/server/service-categroies-service";
import { getServiceStats } from "@/services/server/service-stats-service";
import type { ServiceResponse } from "@/types/service.types";

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
    title: "Web Development",
    description:
      "Fusce convallis sem lorem ment. Phasellus oelou laoreet libero. Integer neque iaculis.",
    orderIndex: 3,
  },
  {
    id: 4,
    categoryId: 1,
    title: "Brand Design",
    description:
      "Fusce convallis sem lorem ment. Phasellus oelou laoreet libero. Integer neque iaculis.",
    orderIndex: 4,
  },
];

export default async function ServicesPage() {
  const [servicesPage, categoriesPage, statsPage] = await Promise.all([
    getServices(0, 24),
    getServiceCategories(0, 12),
    getServiceStats(0, 12),
  ]);

  const services = (servicesPage?.content ?? [])
    .slice()
    .sort((a, b) => a.orderIndex - b.orderIndex);
  const categories = (categoriesPage?.content ?? [])
    .slice()
    .sort((a, b) => a.orderIndex - b.orderIndex);
  const stats = (statsPage?.content ?? []).slice();

  const displayServices =
    services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <main className="min-h-screen bg-[#8d929b]">
      <ServicePageHero />
      <ServicePageContent
        services={displayServices}
        categories={categories}
        stats={stats}
        basePath=""
      />
    </main>
  );
}
