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

      {/* Sol: kırmızı daire — referans gibi solda, soldan boşluklu, dikey ortada */}
      <div
        className="absolute left-8 top-1/2 z-0 h-[min(70vw,380px)] w-[min(70vw,380px)] -translate-x-[30%] -translate-y-1/2 rounded-full bg-[#cc3333] md:left-12 md:-translate-x-[28%] lg:left-16"
        aria-hidden
      />

      {/* Yazı + buton — next/prev’de smooth fade + kayma */}
      <div
        className={cn(
          "slider-transition-wrap relative z-20 grid h-full min-h-0 grid-cols-[1fr_1fr]",
          transitionOut && "slider-transition-out"
        )}
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
          <div
            key={index}
            className={cn(
              "slider-content-enter mx-auto max-w-2xl space-y-4 text-center text-white",
              "mt-4 mb-4 px-4 md:mt-6 md:mb-6 md:px-6"
            )}
          >
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-[2.75rem]">
              {slide.title}
            </h1>
            {slide.description ? (
              <p className="mx-auto max-w-xl text-base leading-relaxed text-white/95 line-clamp-4 wrap-break-word sm:text-lg">
                {slide.description}
              </p>
            ) : null}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
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
        <div aria-hidden />
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
