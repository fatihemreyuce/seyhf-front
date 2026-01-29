"use client";

import { Card } from "@/components/ui/card";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CircularResponse } from "@/types/circulars.types";

export interface CircularsGridProps {
  circulars: CircularResponse[];
}

export function CircularsGrid({ circulars }: CircularsGridProps) {
  const display = circulars.slice(0, 6);
  const isEmpty = display.length === 0;

  return (
    <AnimateOnScroll variant="from-bottom">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isEmpty
          ? Array.from({ length: 6 }, (_, i) => <PlaceholderCard key={i} />)
          : display.map((circular) => (
              <CircularCard key={circular.id} circular={circular} />
            ))}
      </div>
    </AnimateOnScroll>
  );
}

function PlaceholderCard() {
  return (
    <Card className="grid aspect-3/4 grid-rows-[2fr_1fr] overflow-hidden rounded-t-2xl rounded-b-none border border-gray-200 bg-gray-200 shadow-md">
      <div className="flex min-h-0 flex-col items-center justify-center px-4 pt-4">
        <div className="flex w-full flex-1 flex-col items-center justify-center rounded-t-xl bg-[#F8E8E8]/60 px-3 pt-3">
          <FileText className="h-14 w-14 text-gray-400 sm:h-16 sm:w-16" />
          <span className="mt-2 text-xs font-medium uppercase tracking-wider text-gray-400">
            PDF
          </span>
        </div>
      </div>
      <div className="relative -mt-8 rounded-t-2xl bg-[#FF3333] px-4 pb-4 pt-10">
        <span className="text-xs font-normal text-white">Genelge</span>
        <h3 className="mt-1 text-base font-bold leading-tight text-white md:text-lg">
          —
        </h3>
      </div>
    </Card>
  );
}

function CircularCard({ circular }: { circular: CircularResponse }) {
  const fileUrl = circular.fileUrl;

  return (
    <Card
      className={cn(
        "group grid aspect-3/4 grid-rows-[2fr_1fr] overflow-hidden rounded-t-2xl rounded-b-none border border-gray-200 bg-gray-200 shadow-md",
        "transition-shadow duration-500 ease-out hover:shadow-lg",
      )}
    >
      <div className="relative flex min-h-0 flex-col items-center justify-center px-4 pt-4">
        <div className="relative flex w-full flex-1 flex-col items-center justify-center overflow-hidden rounded-t-xl bg-[#F8E8E8]/60 px-3 pt-3">
          <span
            aria-hidden
            className="absolute inset-0 bg-[#EFE0E0] [clip-path:circle(0%_at_50%_50%)] [transition:clip-path_0.5s_ease-out] group-hover:[clip-path:circle(150%_at_50%_50%)]"
          />
          <FileText className="relative z-10 h-14 w-14 text-gray-400 transition-colors duration-500 group-hover:text-[#c4a0a0] sm:h-16 sm:w-16" />
          <span className="relative z-10 mt-2 text-xs font-medium uppercase tracking-wider text-gray-400 transition-colors duration-500 group-hover:text-[#b09090]">
            PDF
          </span>
          {fileUrl ? (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-20"
              aria-label={`${circular.title} dosyasını aç`}
            />
          ) : null}
        </div>
      </div>
      <div className="relative -mt-8 rounded-t-2xl bg-[#FF3333] px-4 pb-4 pt-10 transition-colors duration-500 group-hover:bg-[#ee2d2d]">
        <span className="text-xs font-normal text-white">Genelge</span>
        <h3 className="mt-1 text-base font-bold leading-tight text-white md:text-lg">
          {circular.title}
        </h3>
      </div>
    </Card>
  );
}
