"use client";

import { useRouter } from "next/navigation";
import { PartnerDetailSheet } from "@/components/sections/partner-detail-sheet";
import type { PartnerResponse } from "@/types/partner.types";

import service01 from "@/app/assets/images/image-box/service-01.png";
import service02 from "@/app/assets/images/image-box/service-02.png";
import service03 from "@/app/assets/images/image-box/service-03.png";
import service04 from "@/app/assets/images/image-box/service-04.png";

const FALLBACKS = [service01, service02, service03, service04] as const;

export function PartnerDetailByRoute({
  partner,
  fallbackImg = service01,
}: {
  partner: PartnerResponse;
  fallbackImg?: (typeof FALLBACKS)[number];
}) {
  const router = useRouter();

  return (
    <PartnerDetailSheet
      partner={partner}
      open
      onOpenChange={(open) => {
        if (!open) router.push("/");
      }}
      fallbackImg={fallbackImg}
    />
  );
}
