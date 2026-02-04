import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Lightbulb } from "lucide-react";
import bgService from "@/app/assets/images/background-section/bg-service.jpg";
import markPage from "@/app/assets/images/mark-page/mark-page.png";

interface UsefulInfoPageHeroProps {
  basePath?: string;
}

export function UsefulInfoPageHero({ basePath = "" }: UsefulInfoPageHeroProps) {
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
        <div className="mx-auto max-w-3xl text-center">
          {/* Breadcrumb */}
          <nav
            className="stat-card-enter visible mb-6 flex items-center justify-center gap-2 text-sm"
            aria-label="Breadcrumb"
          >
            <Link
              href={basePath || "/"}
              className="text-gray-300 transition-colors hover:text-white"
            >
              Ana Sayfa
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-500" />
            <span className="text-white" aria-current="page">
              Faydalı Bilgiler
            </span>
          </nav>

          {/* Icon */}
          <div className="stat-card-enter stat-card-delay-1 visible mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-(--brand-red)/20 backdrop-blur-sm">
            <Lightbulb className="h-10 w-10 text-white" />
          </div>

          {/* Title */}
          <h1 className="stat-card-enter stat-card-delay-2 visible mb-4 text-4xl font-extrabold text-white md:text-5xl">
            Faydalı Bilgiler
          </h1>

          {/* Description */}
          <p className="stat-card-enter stat-card-delay-3 visible text-lg text-gray-300">
            Bilginizi artırmak ve ihtiyaçlarınızı desteklemek için hazırlanmış faydalı kaynaklarımızı, kılavuzlarımızı ve belgelerimizi keşfedin.
          </p>
        </div>
      </div>
    </section>
  );
}
