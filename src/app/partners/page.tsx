import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchPartners } from "@/lib/fetch-partners";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import service01 from "@/app/assets/images/image-box/service-01.png";
import service02 from "@/app/assets/images/image-box/service-02.png";
import service03 from "@/app/assets/images/image-box/service-03.png";
import service04 from "@/app/assets/images/image-box/service-04.png";

const SERVICE_IMAGES = [service01, service02, service03, service04] as const;

export default async function PartnersPage() {
  const partners = await fetchPartners();

  return (
    <main className="relative min-h-screen bg-[#2a2a2a]">
      {/* Decorative dots */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <span className="absolute left-[10%] top-[12%] h-2 w-2 rounded-full bg-[#0d9488]" />
        <span className="absolute right-[28%] top-[18%] h-2 w-2 rounded-full bg-[#3b82f6]" />
        <span className="absolute right-[12%] top-[14%] h-2 w-2 rounded-full bg-[#ED3237]" />
        <span className="absolute bottom-[22%] right-[18%] h-2 w-2 rounded-full bg-[#ec4899]" />
        <span className="absolute bottom-[28%] left-[14%] h-2 w-2 rounded-full bg-[#ec4899]" />
        <span className="absolute bottom-[14%] right-[8%] h-2 w-2 rounded-full bg-[#eab308]" />
      </div>

      <section className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
        {/* Title */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-white/70">
            Our Services List
          </p>
          <h1 className="text-3xl font-bold uppercase tracking-tight text-white md:text-4xl lg:text-5xl">
            THE{" "}
            <span className="text-[#ED3237]">[</span>
            <span className="text-[#4ade80]">SERVICES</span>
            <span className="text-[#ED3237]">]</span> WE&apos;RE OFFERING
          </h1>
        </div>

        {/* Cards */}
        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {partners.length === 0 ? (
            <PlaceholderCards />
          ) : (
            partners.map((partner, i) => (
              <PartnerCard
                key={partner.id}
                partner={partner}
                fallbackImg={SERVICE_IMAGES[i % SERVICE_IMAGES.length]}
              />
            ))
          )}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className={cn(
                "h-2 w-8 rounded-full transition-colors",
                idx === 1 ? "bg-[#ED3237]" : "bg-white/60"
              )}
              aria-hidden
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function PlaceholderCards() {
  return (
    <>
      {[1, 2, 3, 4].map((i) => (
        <Card
          key={i}
          className="overflow-hidden bg-white transition-shadow hover:shadow-lg"
        >
          <div className="aspect-4/3 bg-gray-200" />
          <CardContent className="p-4 text-center">
            <p className="font-medium text-gray-900">—</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

function PartnerCard({
  partner,
  fallbackImg,
}: {
  partner: { id: number; name: string; logoUrl?: string };
  fallbackImg: (typeof SERVICE_IMAGES)[number];
}) {
  const imgSrc = partner.logoUrl ?? fallbackImg;

  return (
    <Link
      href={`/partners/${partner.id}`}
      className="group block"
    >
      <Card className="relative h-full overflow-hidden border-0 bg-white shadow-md transition-shadow hover:shadow-xl">
        <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-200">
          {typeof imgSrc === "string" ? (
            <Image
              src={imgSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              unoptimized={imgSrc.startsWith("http")}
            />
          ) : (
            <Image
              src={imgSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          )}
        </div>
        {/* Hover: soldan sağa kırmızı açılım — overlay kartın üstünde */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 origin-left scale-x-0 bg-[#ED3237] transition-transform duration-300 ease-out group-hover:scale-x-100"
        />
        <CardContent className="relative z-20 flex flex-col items-center gap-2 p-4 text-center">
          <p className="font-semibold text-gray-900 transition-colors group-hover:text-white">
            {partner.name}
          </p>
          <ArrowRight className="h-4 w-4 text-gray-500 opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-white" />
        </CardContent>
      </Card>
    </Link>
  );
}
