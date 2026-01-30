import { getReferences } from "@/services/server/references-service";
import { ReferencesPageHero } from "@/components/sections/references-page-hero";
import { ReferencesPageContent } from "@/components/sections/references-page-content";

export default async function ReferencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const basePath = `/${locale}`;

  let referencesData;
  try {
    const response = await getReferences(0, 50);
    referencesData = (response.content || [])
      .slice()
      .sort((a, b) => a.orderIndex - b.orderIndex);
  } catch (error) {
    console.error("Failed to fetch references:", error);
    referencesData = [];
  }

  return (
    <main className="min-h-screen bg-white">
      <ReferencesPageHero basePath={basePath} />
      <ReferencesPageContent references={referencesData} basePath={basePath} />
    </main>
  );
}
