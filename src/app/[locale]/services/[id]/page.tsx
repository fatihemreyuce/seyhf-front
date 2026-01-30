import { notFound } from "next/navigation";
import { getServiceById, getServices } from "@/services/server/service-service";
import { ServiceDetailHero } from "@/components/sections/service-detail-hero";
import { ServiceDetailContent } from "@/components/sections/service-detail-content";
import { ServiceDetailSidebar } from "@/components/sections/service-detail-sidebar";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const basePath = `/${locale}`;
  const serviceId = parseInt(id, 10);

  if (isNaN(serviceId)) {
    notFound();
  }

  try {
    const [service, allServicesPage] = await Promise.all([
      getServiceById(serviceId),
      getServices(0, 10),
    ]);

    const allServices = (allServicesPage?.content ?? [])
      .slice()
      .sort((a, b) => a.orderIndex - b.orderIndex);

    // Filter out current service from sidebar
    const otherServices = allServices.filter((s) => s.id !== serviceId);

    return (
      <main className="min-h-screen bg-[#f8f9fa]">
        <ServiceDetailHero
          title={service.title}
          basePath={basePath}
        />
        
        <section className="bg-white">
          <div className="content-container py-12 md:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Main Content */}
              <div className="lg:col-span-8">
                <ServiceDetailContent service={service} />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4">
                <ServiceDetailSidebar
                  services={otherServices}
                  basePath={basePath}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch service:", error);
    notFound();
  }
}
