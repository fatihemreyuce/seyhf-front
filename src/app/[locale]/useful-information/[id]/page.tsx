import { notFound } from "next/navigation";
import { getUsefulInformationById, getUsefulInformation } from "@/services/server/useful-information-service";
import { UsefulInfoDetailHero } from "@/components/sections/useful-info-detail-hero";
import { UsefulInfoDetailContent } from "@/components/sections/useful-info-detail-content";
import { UsefulInfoDetailSidebar } from "@/components/sections/useful-info-detail-sidebar";

export default async function UsefulInformationDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const basePath = `/${locale}`;
  const infoId = parseInt(id, 10);

  if (isNaN(infoId)) {
    notFound();
  }

  try {
    const [info, allInfoPage] = await Promise.all([
      getUsefulInformationById(infoId),
      getUsefulInformation(0, 10),
    ]);

    const allInfo = allInfoPage?.content ?? [];
    
    // Filter out current item from sidebar
    const otherInfo = allInfo.filter((item) => item.id !== infoId);

    return (
      <main className="min-h-screen bg-[#f8f9fa]">
        <UsefulInfoDetailHero
          title={info.title}
          basePath={basePath}
        />
        
        <section className="bg-white">
          <div className="content-container py-12 md:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Main Content */}
              <div className="lg:col-span-8">
                <UsefulInfoDetailContent info={info} />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4">
                <UsefulInfoDetailSidebar
                  items={otherInfo}
                  basePath={basePath}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch useful information:", error);
    notFound();
  }
}
