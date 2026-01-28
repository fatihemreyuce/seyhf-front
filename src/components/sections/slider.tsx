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
      className="relative h-210 w-full overflow-hidden bg-black"
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
          unoptimized={typeof slide.imageUrl === "string" && slide.imageUrl.startsWith("http")}
        />
      </div>

      {/* Kırmızı daire: sabit, animasyonsuz */}
      <div
        className="absolute left-8 top-1/2 z-0 h-[min(70vw,380px)] w-[min(70vw,380px)] -translate-x-[30%] -translate-y-1/2 rounded-full bg-[#cc3333] opacity-70 md:left-12 md:-translate-x-[28%] lg:left-16"
        aria-hidden
      />

      {/* Metin + buton + tel — ref: sola hizalı, kısmen daire üstünde; buton gri, koyu yazı */}
      <div className="relative z-10 flex h-full min-h-0 flex-col justify-center pl-8 pr-6 md:pl-16 md:pr-10 lg:pl-24 lg:pr-12">
        <div
          key={index}
          className={cn(
            "slider-content-enter slider-transition-wrap max-w-2xl space-y-4 text-left text-white",
            transitionOut && "slider-transition-out"
          )}
        >
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-[2.75rem]">
            {slide.title}
          </h1>
          {slide.description ? (
            <p className="max-w-xl text-base leading-relaxed text-white/95 line-clamp-4 sm:text-lg">
              {stripHtml(slide.description)}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/contact"
              className="group relative inline-flex overflow-hidden rounded-lg border-2 border-white bg-transparent px-6 py-3 text-base font-bold text-white transition-colors duration-300"
            >
              <span className="relative z-10">Get In Touch +</span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-1/2 w-full -translate-x-1/2 bg-[#ED3237] origin-center scale-x-0 transition-transform duration-350 ease-out group-hover:scale-x-100"
              />
            </Link>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#cc3333]">
                <Headphones className="h-5 w-5 text-white" aria-hidden />
              </span>
              <span className="text-white">+55 (121) 234 444</span>
            </div>
          </div>
        </div>
      </div>

      {/* Üçgen + pembe daire — ref. animasyon halleri: üçgen önde, bazen örtüşme bazen az mesafe */}
      <div className="pointer-events-none absolute inset-0 z-0 isolate flex items-end justify-end overflow-hidden">
        <div
          className="slider-shape-circle absolute bottom-[8%] right-[10%] z-1 h-[min(22vw,140px)] w-[min(22vw,140px)] rounded-full bg-[#FC60AF]"
          aria-hidden
        />
        <div
          className="slider-shape-triangle absolute bottom-[20%] right-[12%] z-2 h-0 w-0 border-b-[min(19vw,120px)] border-l-[min(11vw,70px)] border-r-[min(11vw,70px)] border-l-transparent border-r-transparent"
          style={{ borderBottomColor: "#6A6AFF" }}
          aria-hidden
        />
      </div>

      {/* Nav okları */}
      <button
        type="button"
        onClick={() => go(-1)}
        className={cn(
          "absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full shadow-md transition-colors duration-200 md:left-4 md:h-11 md:w-11",
          "bg-[#9ca3af] hover:bg-[#cc3333]"
        )}
        aria-label="Önceki slide"
      >
        <ChevronLeft className="h-5 w-5 text-white md:h-6 md:w-6" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        className={cn(
          "absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full shadow-md transition-colors duration-200 md:right-4 md:h-11 md:w-11",
          "bg-[#9ca3af] hover:bg-[#cc3333]"
        )}
        aria-label="Sonraki slide"
      >
        <ChevronRight className="h-5 w-5 text-white md:h-6 md:w-6" />
      </button>
    </section>
  );
}
