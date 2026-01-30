import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { fetchPartnerById } from "@/lib/api";
import { PartnerDetailSheet } from "@/components/sections/partner-detail-sheet";
import { PartnerDetailByRoute } from "./partner-detail-by-route";

import service01 from "@/app/assets/images/image-box/service-01.png";
import service02 from "@/app/assets/images/image-box/service-02.png";
import service03 from "@/app/assets/images/image-box/service-03.png";
import service04 from "@/app/assets/images/image-box/service-04.png";

const FALLBACKS = [service01, service02, service03, service04] as const;

export default async function PartnerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  if (Number.isNaN(numId) || numId < 1) notFound();

  const partner = await fetchPartnerById(numId);
  if (!partner) notFound();

  const fallbackImg = FALLBACKS[(numId - 1) % FALLBACKS.length];

  return (
    <main className="relative min-h-screen bg-[#2a2a2a]">
      <div className="content-container relative py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Ana sayfaya dön</span>
        </Link>
      </div>
      <PartnerDetailByRoute partner={partner} fallbackImg={fallbackImg} />
    </main>
  );
}
