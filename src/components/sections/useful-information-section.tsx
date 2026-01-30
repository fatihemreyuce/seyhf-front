import { getUsefulInformation } from "@/services/server/useful-information-service";
import { UsefulInformationCard } from "./useful-information-card";
import { Lightbulb } from "lucide-react";

export async function UsefulInformationSection() {
  let usefulInfoData;
  
  try {
    const response = await getUsefulInformation(0, 6);
    usefulInfoData = response.content || [];
  } catch (error) {
    console.error("Failed to fetch useful information:", error);
    usefulInfoData = [];
  }

  if (usefulInfoData.length === 0) {
    return null;
  }

  return (
    <section className="bg-linear-to-b from-gray-50 to-white py-16 md:py-20">
      <div className="content-container">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-(--brand-red)/10">
            <Lightbulb className="h-8 w-8 text-(--brand-red)" />
          </div>
          <h2 className="mb-4 text-3xl font-extrabold text-[#111] md:text-4xl">
            Useful Information
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#666]">
            Discover helpful resources, guides, and documents to enhance your knowledge
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {usefulInfoData.map((info, index) => (
            <UsefulInformationCard
              key={info.id}
              info={info}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
