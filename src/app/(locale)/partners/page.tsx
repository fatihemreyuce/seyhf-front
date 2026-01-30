import { getPartners } from "@/services/server/partner-service";
import { PartnersPageHero } from "@/components/sections/partners-page-hero";
import { PartnersPageContent } from "@/components/sections/partners-page-content";

export default async function PartnersPage() {
  let partnersData;
  try {
    const response = await getPartners(0, 50);
    partnersData = response.content || [];
  } catch (error) {
    console.error("Failed to fetch partners:", error);
    partnersData = [];
  }

  return (
    <main className="min-h-screen bg-white">
      <PartnersPageHero />
      <PartnersPageContent partners={partnersData} />
    </main>
  );
}
