import { getUsefulInformation } from "@/services/server/useful-information-service";
import { UsefulInfoPageHero } from "@/components/sections/useful-info-page-hero";
import { UsefulInfoPageContent } from "@/components/sections/useful-info-page-content";

export default async function UsefulInformationPage() {
  let usefulInfoData;
  try {
    const response = await getUsefulInformation(0, 50);
    usefulInfoData = response.content || [];
  } catch (error) {
    console.error("Failed to fetch useful information:", error);
    usefulInfoData = [];
  }

  return (
    <main className="min-h-screen bg-white">
      <UsefulInfoPageHero />
      <UsefulInfoPageContent data={usefulInfoData} />
    </main>
  );
}
