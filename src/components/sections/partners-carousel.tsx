"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { PartnerDetailSheet } from "./partner-detail-sheet";
import { cn } from "@/lib/utils";
import type { PartnerResponse } from "@/types/partner.types";

import service01 from "@/app/assets/images/image-box/service-01.png";
import service02 from "@/app/assets/images/image-box/service-02.png";
import service03 from "@/app/assets/images/image-box/service-03.png";
import service04 from "@/app/assets/images/image-box/service-04.png";

const SERVICE_IMAGES = [service01, service02, service03, service04] as const;
const CARDS_PER_PAGE = 4;

export interface PartnersCarouselProps {
  partners: PartnerResponse[];
}

export function PartnersCarousel({ partners }: PartnersCarouselProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(0);
  const [selectedPartner, setSelectedPartner] =
    useState<PartnerResponse | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const totalPages = Math.max(1, Math.ceil(partners.length / CARDS_PER_PAGE));
  const goTo = useCallback(
    (p: number) => {
      setPage((prev) => Math.max(0, Math.min(totalPages - 1, p)));
    },
    [totalPages],
  );

  const openDetail = useCallback(
    (p: PartnerResponse) => {
      setSelectedPartner(p);
      setSheetOpen(true);
      router.replace(`/?partner=${p.id}`, { scroll: false });
    },
    [router],
  );

  const closeDetail = useCallback(() => {
    setSheetOpen(false);
    setSelectedPartner(null);
    router.replace("/", { scroll: false });
  }, [router]);

  useEffect(() => {
    const id = searchParams.get("partner");
    if (!id) {
      if (!sheetOpen) return;
      setSheetOpen(false);
      setSelectedPartner(null);
      return;
    }
    const numId = Number(id);
    if (Number.isNaN(numId) || numId < 1) return;
    const p = partners.find((x) => x.id === numId);
    if (p) {
      setSelectedPartner(p);
      setSheetOpen(true);
    }
  }, [searchParams, partners]);

  const items = Array.from({ length: totalPages }, (_, i) =>
    partners.slice(i * CARDS_PER_PAGE, (i + 1) * CARDS_PER_PAGE),
  );
  const slidePct = totalPages > 0 ? 100 / totalPages : 100;
  const isEmpty = partners.length === 0;

  return (
    <>
      <AnimateOnScroll variant="from-bottom">
        <div className="relative -mx-1 overflow-hidden">
          <div
            className="flex will-change-transform transition-transform duration-500 ease-out"
            style={{
              width: `${totalPages * 100}%`,
              transform: `translate3d(-${(page / totalPages) * 100}%, 0, 0)`,
            }}
          >
            {isEmpty ? (
              <div
                className="grid shrink-0 grid-cols-2 gap-4 lg:grid-cols-4"
                style={{ flex: `0 0 ${slidePct}%` }}
              >
                {[1, 2, 3, 4].map((i) => (
                  <Card
                    key={i}
                    className="overflow-hidden bg-white transition-shadow hover:shadow-lg"
                  >
                    <div className="aspect-5/3 bg-gray-200" />
                    <CardContent className="p-3 text-center">
                      <p className="text-sm font-medium text-gray-900">—</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              items.map((chunk, slideIdx) => (
                <div
                  key={slideIdx}
                  className="grid shrink-0 grid-cols-2 gap-4 px-1 lg:grid-cols-4"
                  style={{ flex: `0 0 ${slidePct}%` }}
                >
                  {chunk.map((partner, i) => (
                    <PartnerCard
                      key={partner.id}
                      partner={partner}
                      fallbackImg={
                        SERVICE_IMAGES[
                          (slideIdx * CARDS_PER_PAGE + i) %
                            SERVICE_IMAGES.length
                        ]
                      }
                      onSelect={openDetail}
                    />
                  ))}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goTo(idx)}
              className={cn(
                "h-2 w-8 cursor-pointer rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#2a2a2a]",
                idx === page ? "bg-[#ED3237]" : "bg-white/60 hover:bg-white/80",
              )}
              aria-label={`Sayfa ${idx + 1}`}
              aria-current={idx === page ? "true" : undefined}
            />
          ))}
        </div>
      </AnimateOnScroll>

      <PartnerDetailSheet
        partner={selectedPartner}
        open={sheetOpen}
        onOpenChange={(open) => !open && closeDetail()}
        fallbackImg={
          selectedPartner
            ? SERVICE_IMAGES[
                Math.max(
                  0,
                  partners.findIndex((p) => p.id === selectedPartner.id),
                ) % SERVICE_IMAGES.length
              ]
            : service01
        }
      />
    </>
  );
}

function PartnerCard({
  partner,
  fallbackImg,
  onSelect,
}: {
  partner: PartnerResponse;
  fallbackImg: (typeof SERVICE_IMAGES)[number];
  onSelect: (p: PartnerResponse) => void;
}) {
  const imgSrc = partner.logoUrl ?? fallbackImg;

  return (
    <button
      type="button"
      onClick={() => onSelect(partner)}
      className="group block w-full text-left"
    >
      <Card className="relative h-full overflow-hidden border-0 bg-white shadow-md transition-shadow hover:shadow-xl">
        <div className="relative aspect-5/3 w-full overflow-hidden bg-gray-200">
          {typeof imgSrc === "string" ? (
            <Image
              src={imgSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
              unoptimized={imgSrc.startsWith("http")}
            />
          ) : (
            <Image
              src={imgSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          )}
        </div>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 origin-left scale-x-0 bg-[#ED3237]/80 transition-transform duration-500 ease-out group-hover:scale-x-100"
        />
        <CardContent className="relative z-20 flex flex-col items-center gap-1 p-3 text-center">
          <p className="text-sm font-semibold text-gray-900 transition-colors duration-500 group-hover:text-white">
            {partner.name}
          </p>
          <ArrowRight className="h-4 w-4 text-gray-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:text-white" />
        </CardContent>
      </Card>
    </button>
  );
}
