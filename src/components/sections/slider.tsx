"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Headphones } from "lucide-react";
import type { SliderResponse } from "@/types/slider.types";
import { cn } from "@/lib/utils";

import sliderImg1 from "@/app/assets/images/image-slider/slider01-home1.jpg";

export interface SliderProps {
  slides: SliderResponse[];
}

const FALLBACK_SLIDES: SliderResponse[] = [
  {
    id: 0,
    title: "We came with creative digital agency.",
    description: "",
    orderIndex: 0,
    imageUrl: undefined,
  },
];

const SLIDE_TRANSITION_MS = 400;

/** HTML etiketlerini kaldırıp sadece düz metni döndürür. */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function Slider({ slides }: SliderProps) {
  const items = slides.length > 0 ? slides : FALLBACK_SLIDES;
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionLockRef = useRef(false);

  const go = useCallback(
    (delta: number) => {
      if (transitionLockRef.current) return;
      transitionLockRef.current = true;
      setIsTransitioning(true);
      setTimeout(() => {
        setIndex((i) => (i + delta + items.length) % items.length);
        transitionLockRef.current = false;
        setIsTransitioning(false);
      }, SLIDE_TRANSITION_MS);
    },
    [items.length]
  );

  useEffect(() => {
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [go]);

  const slide = items[index]!;
  const transitionOut = isTransitioning;

  return (
    <section
      className="relative w-full overflow-hidden bg-black min-h-[280px] sm:min-h-[360px] md:min-h-[900px] md:h-[900px] xl:min-h-[95vh] xl:h-[95vh]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Resim: tam kaplama — next/prev’de smooth fade */}
      <div
        className={cn(
          "slider-transition-wrap absolute inset-0 z-0 overflow-hidden",
          transitionOut && "slider-transition-out-fade",
          !transitionOut && (hover ? "opacity-80" : "opacity-55")
        )}
      >
        <Image
          src={slide.imageUrl ?? sliderImg1}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          unoptimized={
            typeof slide.imageUrl === "string" &&
            slide.imageUrl.startsWith("http")
          }
        />
      </div>

      {/* İçerik wrapper: content-container (siyah çizgi) */}
      <div className="content-container relative z-10 flex h-full min-h-0 flex-col justify-center">
        {/* Mavi daire: mobilde küçük (taşma yok), sm+ büyür — tailwind: slider mobil */}
        <div
          className="content-container-edge absolute top-1/2 z-0 h-[min(52vw,240px)] w-[min(52vw,240px)] -translate-x-[35%] -translate-y-1/2 rounded-full bg-(--collbrai-dark) opacity-75 sm:h-[min(62vw,300px)] sm:w-[min(62vw,300px)] sm:-translate-x-[32%] sm:opacity-70 md:h-[min(70vw,380px)] md:w-[min(70vw,380px)] md:-translate-x-[28%]"
          aria-hidden
        />
        <div
          key={index}
          className={cn(
            "slider-content-enter slider-transition-wrap max-w-2xl space-y-3 text-left text-white xs:space-y-4",
            transitionOut && "slider-transition-out"
          )}
        >
          <h1 className="text-xl font-bold leading-tight text-white xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl lg:leading-tight">
            {slide.title}
          </h1>
          {slide.description ? (
            <p className="max-w-xl text-sm leading-relaxed text-white/95 line-clamp-3 xs:text-base xs:line-clamp-4 sm:text-lg">
              {stripHtml(slide.description)}
            </p>
          ) : null}
          <div className="flex flex-col gap-3 pt-2 xs:flex-row xs:flex-wrap xs:items-center xs:gap-4">
            <Link
              href="/contact"
              className="group relative inline-flex min-h-touch min-w-[140px] items-center justify-center overflow-hidden rounded-lg border-2 border-white bg-transparent px-5 py-5 text-sm font-bold text-white transition-colors duration-300 xs:px-6 xs:py-6 xs:text-base"
            >
              <span className="relative z-10">İletişime Geç +</span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-1/2 w-full -translate-x-1/2 bg-(--brand-red) origin-center scale-x-0 transition-transform duration-350 ease-out group-hover:scale-x-100"
              />
            </Link>
            <div className="flex items-center gap-2 xs:gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--collbrai-dark) xs:h-12 xs:w-12">
                <Headphones
                  className="h-4 w-4 text-white xs:h-5 xs:w-5"
                  aria-hidden
                />
              </span>
              <span className="text-sm text-white xs:text-base">
                +55 (121) 234 444
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Üçgen + pembe daire: mobilde gizli (daha sade), sm+ görünür — tailwind: slider mobil */}
      <div className="pointer-events-none absolute inset-0 z-0 isolate flex items-end justify-end overflow-hidden">
        <div
          className="slider-shape-circle absolute bottom-[8%] right-[10%] z-1 h-0 w-0 rounded-full bg-(--collbrai-accent-highlight) opacity-0 sm:block sm:h-[min(18vw,100px)] sm:w-[min(18vw,100px)] sm:opacity-100 md:h-[min(22vw,140px)] md:w-[min(22vw,140px)]"
          aria-hidden
        />
        <div
          className="slider-shape-triangle absolute bottom-[20%] right-[12%] z-2 h-0 w-0 border-b-[min(14vw,90px)] border-l-[min(8vw,50px)] border-r-[min(8vw,50px)] border-l-transparent border-r-transparent opacity-0 sm:opacity-100 md:border-b-[min(19vw,120px)] md:border-l-[min(11vw,70px)] md:border-r-[min(11vw,70px)]"
          style={{ borderBottomColor: "var(--collbrai-accent)" }}
          aria-hidden
        />
      </div>

      {/* Nav okları: mobilde touch (min-h-touch), taşmayı önlemek için kenara yakın */}
      <button
        type="button"
        onClick={() => go(-1)}
        className={cn(
          "absolute left-1.5 top-1/2 z-20 flex min-h-touch min-w-touch -translate-y-1/2 items-center justify-center rounded-full shadow-md transition-colors duration-200 active:scale-95 sm:left-2 md:left-4 md:h-11 md:w-11",
          "bg-[#9ca3af] hover:bg-(--brand-red)"
        )}
        aria-label="Önceki slide"
      >
        <ChevronLeft className="h-5 w-5 text-white md:h-6 md:w-6" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        className={cn(
          "absolute right-1.5 top-1/2 z-20 flex min-h-touch min-w-touch -translate-y-1/2 items-center justify-center rounded-full shadow-md transition-colors duration-200 active:scale-95 sm:right-2 md:right-4 md:h-11 md:w-11",
          "bg-[#9ca3af] hover:bg-(--brand-red)"
        )}
        aria-label="Sonraki slide"
      >
        <ChevronRight className="h-5 w-5 text-white md:h-6 md:w-6" />
      </button>
    </section>
  );
}
