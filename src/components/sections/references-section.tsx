import { getReferences } from "@/services/server/references-service";
import { ReferencesGrid } from "./references-grid";
import { Award, Sparkles } from "lucide-react";

export async function ReferencesSection() {
  let referencesData;

  try {
    const response = await getReferences(0, 12);
    referencesData = (response.content || [])
      .slice()
      .sort((a, b) => a.orderIndex - b.orderIndex);
  } catch (error) {
    console.error("Failed to fetch references:", error);
    referencesData = [];
  }

  if (referencesData.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white via-gray-50/30 to-white py-16 md:py-20">
      {/* Decorative Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-(--brand-red)/5 blur-3xl" />
        <div className="absolute -left-32 bottom-20 h-96 w-96 rounded-full bg-gray-400/10 blur-3xl" />
        <span className="absolute left-[8%] top-[15%] h-2 w-2 animate-pulse rounded-full bg-(--brand-red)/40" />
        <span className="absolute right-[12%] top-[25%] h-2 w-2 animate-pulse rounded-full bg-gray-400/40 animation-delay-1000" />
        <span className="absolute left-[15%] bottom-[20%] h-2 w-2 animate-pulse rounded-full bg-(--brand-red)/40 animation-delay-2000" />
        <span className="absolute right-[18%] bottom-[30%] h-2 w-2 animate-pulse rounded-full bg-gray-400/40 animation-delay-1500" />
      </div>

      <div className="content-container relative">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-(--brand-red)/10 via-(--brand-red)/5 to-transparent shadow-lg">
            <Award className="h-10 w-10 text-(--brand-red)" />
          </div>
          
          <div className="mx-auto mb-3 flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-(--brand-red)" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#999]">
              Our Success Stories
            </p>
            <Sparkles className="h-4 w-4 text-(--brand-red)" />
          </div>

          <h2 className="mb-4 text-3xl font-extrabold text-[#111] md:text-4xl lg:text-5xl">
            Trusted <span className="text-(--brand-red)">References</span>
          </h2>
          
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#666]">
            Discover the companies and organizations that trust us to deliver
            exceptional solutions and services
          </p>
        </div>

        {/* Grid */}
        <ReferencesGrid references={referencesData} />
      </div>
    </section>
  );
}
