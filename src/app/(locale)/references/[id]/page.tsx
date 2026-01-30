import { notFound } from "next/navigation";
import { getReferenceById, getReferences } from "@/services/server/references-service";
import { ReferenceDetailHero } from "@/components/sections/reference-detail-hero";
import { ReferenceDetailContent } from "@/components/sections/reference-detail-content";
import { ReferenceDetailSidebar } from "@/components/sections/reference-detail-sidebar";

export default async function ReferenceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const referenceId = parseInt(id, 10);

  if (isNaN(referenceId)) {
    notFound();
  }

  try {
    const [reference, allReferencesPage] = await Promise.all([
      getReferenceById(referenceId),
      getReferences(0, 20),
    ]);

    const allReferences = (allReferencesPage?.content ?? [])
      .slice()
      .sort((a, b) => a.orderIndex - b.orderIndex);

    // Filter out current reference from sidebar
    const otherReferences = allReferences.filter((r) => r.id !== referenceId);

    return (
      <main className="min-h-screen bg-[#f8f9fa]">
        <ReferenceDetailHero name={reference.name} />

        <section className="bg-white">
          <div className="content-container py-12 md:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Main Content */}
              <div className="lg:col-span-8">
                <ReferenceDetailContent reference={reference} />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4">
                <ReferenceDetailSidebar references={otherReferences} />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch reference:", error);
    notFound();
  }
}
