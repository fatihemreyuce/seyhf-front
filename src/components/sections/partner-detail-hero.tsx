import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Users } from "lucide-react";
import bgService from "@/app/assets/images/background-section/bg-service.jpg";
import markPage from "@/app/assets/images/mark-page/mark-page.png";

interface PartnerDetailHeroProps {
  name: string;
  basePath?: string;
}

export function PartnerDetailHero({ name, basePath = "" }: PartnerDetailHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#282A2E] py-20 md:py-28">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src={bgService}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <Image
          src={markPage}
          alt=""
          className="h-auto w-full"
          priority
          aria-hidden
        />
      </div>

      {/* Content */}
      <div className="content-container relative z-20">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <nav
            className="stat-card-enter visible mb-6 flex items-center gap-2 text-sm"
            aria-label="Breadcrumb"
          >
            <Link
              href={basePath || "/"}
              className="text-gray-300 transition-colors hover:text-white"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-500" />
            <Link
              href={`${basePath}/partners`}
              className="text-gray-300 transition-colors hover:text-white"
            >
              Partners
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-500" />
            <span className="text-white line-clamp-1" aria-current="page">
              {name}
            </span>
          </nav>

          {/* Icon */}
          <div className="stat-card-enter stat-card-delay-1 visible mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-(--brand-red)/20 backdrop-blur-sm">
            <Users className="h-8 w-8 text-white" />
          </div>

          {/* Title */}
          <h1 className="stat-card-enter stat-card-delay-2 visible text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
            {name}
          </h1>
        </div>
      </div>
    </section>
  );
}
