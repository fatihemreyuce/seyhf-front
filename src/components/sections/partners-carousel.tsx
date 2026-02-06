"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { cn } from "@/lib/utils";
import type { PartnerResponse } from "@/types/partner.types";

import service01 from "@/app/assets/images/image-box/service-01.png";
import service02 from "@/app/assets/images/image-box/service-02.png";
import service03 from "@/app/assets/images/image-box/service-03.png";
import service04 from "@/app/assets/images/image-box/service-04.png";

const SERVICE_IMAGES = [service01, service02, service03, service04] as const;
const CARDS_PER_PAGE = 4;
const DRAG_THRESHOLD_PX = 50;

export interface PartnersCarouselProps {
  partners: PartnerResponse[];
}

export function PartnersCarousel({ partners }: PartnersCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const justDraggedRef = useRef(false);
  const [page, setPage] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [didDrag, setDidDrag] = useState(false);

  const totalPages = Math.max(1, Math.ceil(partners.length / CARDS_PER_PAGE));
  const goTo = useCallback(
    (p: number) => {
      setPage((prev) => Math.max(0, Math.min(totalPages - 1, p)));
    },
    [totalPages],
  );

  const getClientX = (e: React.TouchEvent | React.MouseEvent) =>
    "touches" in e ? e.touches[0].clientX : e.clientX;

  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true);
    setDidDrag(false);
    setDragStartX(clientX);
    setDragOffset(0);
  }, []);

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return;
      setDidDrag(true);
      setDragOffset(clientX - dragStartX);
    },
    [isDragging, dragStartX],
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    justDraggedRef.current = didDrag;
    const threshold = containerRef.current
      ? Math.min(DRAG_THRESHOLD_PX, containerRef.current.offsetWidth * 0.15)
      : DRAG_THRESHOLD_PX;
    if (dragOffset > threshold && page > 0) goTo(page - 1);
    else if (dragOffset < -threshold && page < totalPages - 1) goTo(page + 1);
    setIsDragging(false);
    setDragOffset(0);
    setDragStartX(0);
  }, [isDragging, didDrag, dragOffset, page, totalPages, goTo]);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: TouchEvent | MouseEvent) =>
      handleDragMove("touches" in e ? e.touches[0].clientX : e.clientX);
    const onEnd = () => handleDragEnd();
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    return () => {
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  const items = Array.from({ length: totalPages }, (_, i) =>
    partners.slice(i * CARDS_PER_PAGE, (i + 1) * CARDS_PER_PAGE),
  );
  const slidePct = totalPages > 0 ? 100 / totalPages : 100;
  const isEmpty = partners.length === 0;
  const baseTranslate = totalPages > 0 ? (page / totalPages) * 100 : 0;
  const trackTransform = `translate3d(calc(-${baseTranslate}% + ${dragOffset}px), 0, 0)`;

  return (
    <>
      <AnimateOnScroll variant="from-bottom">
        <div
          ref={containerRef}
          className="partners-carousel-drag-area relative -mx-1 overflow-hidden"
          onTouchStart={(e) => handleDragStart(getClientX(e))}
          onMouseDown={(e) => handleDragStart(e.clientX)}
        >
          <div
            className={cn(
              "partners-carousel-track flex will-change-transform",
              isDragging && "no-transition",
            )}
            style={{
              width: `${totalPages * 100}%`,
              transform: trackTransform,
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
                      justDraggedRef={justDraggedRef}
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
                "h-2 w-8 cursor-pointer rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-(--collbrai-dark)",
                idx === page ? "bg-(--brand-red)" : "bg-white/60 hover:bg-white/80",
              )}
              aria-label={`Sayfa ${idx + 1}`}
              aria-current={idx === page ? "true" : undefined}
            />
          ))}
        </div>
      </AnimateOnScroll>
    </>
  );
}

function PartnerCard({
  partner,
  fallbackImg,
  justDraggedRef,
}: {
  partner: PartnerResponse;
  fallbackImg: (typeof SERVICE_IMAGES)[number];
  justDraggedRef: React.MutableRefObject<boolean>;
}) {
  const imgSrc = partner.logoUrl ?? fallbackImg;

  const handleClick = (e: React.MouseEvent) => {
    if (justDraggedRef.current) {
      e.preventDefault();
      justDraggedRef.current = false;
    }
  };

  return (
    <Link
      href={`/partners/${partner.id}`}
      onClick={handleClick}
      className="group block w-full"
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
          className="pointer-events-none absolute inset-0 z-10 origin-left scale-x-0 bg-(--brand-red)/80 transition-transform duration-500 ease-out group-hover:scale-x-100"
        />
        <CardContent className="relative z-20 flex flex-col items-center gap-1 p-3 text-center">
          <p className="text-sm font-semibold text-gray-900 transition-colors duration-500 group-hover:text-white">
            {partner.name}
          </p>
          <ArrowRight className="h-4 w-4 text-gray-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:text-white" />
        </CardContent>
      </Card>
    </Link>
  );
}
