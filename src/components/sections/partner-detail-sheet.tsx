"use client";

import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Hash,
  Type,
  ListOrdered,
  ImageIcon,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import type { PartnerResponse } from "@/types/partner.types";

import service01 from "@/app/assets/images/image-box/service-01.png";
import service02 from "@/app/assets/images/image-box/service-02.png";
import service03 from "@/app/assets/images/image-box/service-03.png";
import service04 from "@/app/assets/images/image-box/service-04.png";

import { cn } from "@/lib/utils";

const FALLBACK_IMAGES = [service01, service02, service03, service04] as const;

export interface PartnerDetailSheetProps {
  partner: PartnerResponse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fallbackImg?: (typeof FALLBACK_IMAGES)[number];
}

const DETAIL_ITEMS: {
  key: keyof PartnerResponse;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  format?: (v: unknown) => string;
}[] = [
  { key: "id", label: "Partner ID", icon: Hash, format: (v) => String(v) },
  { key: "name", label: "İsim", icon: Type },
  {
    key: "orderIndex",
    label: "Sıra",
    icon: ListOrdered,
    format: (v) => String(v),
  },
];

function formatValue(
  key: keyof PartnerResponse,
  value: unknown,
  format?: (v: unknown) => string,
): string {
  if (format) return format(value);
  if (value == null) return "—";
  return String(value);
}

export function PartnerDetailSheet({
  partner,
  open,
  onOpenChange,
  fallbackImg = service01,
}: PartnerDetailSheetProps) {
  const imgSrc = partner?.logoUrl ?? fallbackImg;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className={cn(
          "flex w-full max-w-md flex-col gap-0 overflow-y-auto border-0 p-0 sm:max-w-md",
          "bg-linear-to-b from-[#c41e3a] via-[#dc3545] to-[#e84555]",
          "rounded-l-2xl shadow-2xl shadow-black/20",
          "[&_.sheet-close]:text-white [&_.sheet-close]:hover:text-white [&_.sheet-close]:hover:bg-white/10 [&_.sheet-close]:rounded-full [&_.sheet-close]:p-1",
        )}
        showCloseButton
      >
        {partner ? (
          <>
            <SheetHeader className="shrink-0 rounded-tl-2xl border-b border-white/20 bg-white/5 px-5 py-4 text-left shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 shadow-inner">
                  <ChevronDown className="h-4 w-4 shrink-0 text-white" />
                </span>
                <SheetTitle className="text-lg font-bold tracking-tight text-white drop-shadow-sm">
                  Detaylar
                </SheetTitle>
              </div>
              <SheetDescription className="sr-only">
                {partner.name} detayları
              </SheetDescription>
            </SheetHeader>

            <div className="flex-1 space-y-3 px-5 py-5">
              {DETAIL_ITEMS.map(({ key, label, icon: Icon, format }) => {
                const value = partner[key];
                const str = formatValue(key, value, format);
                return (
                  <div
                    key={key}
                    className="flex items-center gap-4 rounded-xl bg-white/10 px-4 py-3 shadow-lg shadow-black/10 ring-1 ring-white/10 transition-all hover:bg-white/15 hover:shadow-xl hover:ring-white/20"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20 shadow-inner">
                      <Icon className="h-4 w-4 text-white" />
                    </span>
                    <span className="flex-1 font-semibold text-white">
                      {label}
                    </span>
                    <span className="rounded-lg bg-white/10 px-3 py-1 text-sm font-medium text-white/95">
                      {str}
                    </span>
                  </div>
                );
              })}
              <div className="flex items-center gap-4 rounded-xl bg-white/10 px-4 py-3 shadow-lg shadow-black/10 ring-1 ring-white/10">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20 shadow-inner">
                  <ImageIcon className="h-4 w-4 text-white" />
                </span>
                <span className="flex-1 font-semibold text-white">Logo</span>
              </div>
            </div>

            <div className="relative mx-5 mb-4 overflow-hidden rounded-2xl bg-white/10 shadow-inner ring-1 ring-white/20">
              <div className="relative aspect-video w-full">
                {typeof imgSrc === "string" ? (
                  <Image
                    src={imgSrc}
                    alt=""
                    fill
                    className="object-contain p-5"
                    sizes="400px"
                    unoptimized={imgSrc.startsWith("http")}
                  />
                ) : (
                  <Image
                    src={imgSrc}
                    alt=""
                    fill
                    className="object-contain p-5"
                    sizes="400px"
                  />
                )}
              </div>
            </div>

            <div className="shrink-0 rounded-bl-2xl border-t border-white/20 bg-white/5 px-5 py-5 shadow-inner backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                <span className="text-center text-xl font-bold tracking-tight text-white drop-shadow-sm">
                  {partner.name}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 shadow-lg ring-2 ring-white/30 transition-all hover:bg-white/30 hover:scale-110">
                  <ArrowRight className="h-5 w-5 text-white" aria-hidden />
                </span>
              </div>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
