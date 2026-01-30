import { notFound } from "next/navigation";
import { getPartnerById, getPartners } from "@/services/server/partner-service";
import { PartnerDetailHero } from "@/components/sections/partner-detail-hero";
import { PartnerDetailContent } from "@/components/sections/partner-detail-content";
import { PartnerDetailSidebar } from "@/components/sections/partner-detail-sidebar";

export default async function PartnerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const partnerId = parseInt(id, 10);

  if (isNaN(partnerId)) {
    notFound();
  }

  try {
    const [partner, allPartnersPage] = await Promise.all([
      getPartnerById(partnerId),
      getPartners(0, 20),
    ]);

    const allPartners = (allPartnersPage?.content ?? [])
      .slice()
      .sort((a, b) => a.orderIndex - b.orderIndex);

    // Filter out current partner from sidebar
    const otherPartners = allPartners.filter((p) => p.id !== partnerId);

    return (
      <main className="min-h-screen bg-[#f8f9fa]">
        <PartnerDetailHero name={partner.name} />
        
        <section className="bg-white">
          <div className="content-container py-12 md:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Main Content */}
              <div className="lg:col-span-8">
                <PartnerDetailContent partner={partner} />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4">
                <PartnerDetailSidebar partners={otherPartners} />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch partner:", error);
    notFound();
  }
}
