import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Home } from "lucide-react";
import bgService from "@/app/assets/images/background-section/bg-service.jpg";
import markPage from "@/app/assets/images/mark-page/mark-page.png";

interface ServiceDetailHeroProps {
  title: string;
  basePath?: string;
}

export function ServiceDetailHero({ title, basePath = "" }: ServiceDetailHeroProps) {
  return (
    <section className="relative bg-[#8d929b] py-16 md:py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={bgService}
          alt=""
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 w-full">
        <Image
          src={markPage}
          alt=""
          className="w-full"
          style={{ height: "auto" }}
        />
      </div>

      <div className="content-container relative z-10">
        {/* Breadcrumb */}
        <nav className="stat-card-enter visible mb-6 flex items-center gap-2 text-sm" style={{ animationDelay: '0ms' }}>
          <Link
            href={basePath || "/"}
            className="flex items-center gap-1 text-white/80 transition-colors hover:text-white"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-4 w-4 text-white/60" />
          <Link
            href={`${basePath}/services`}
            className="text-white/80 transition-colors hover:text-white"
          >
            Services
          </Link>
          <ChevronRight className="h-4 w-4 text-white/60" />
          <span className="font-medium text-white">{title}</span>
        </nav>

        {/* Title */}
        <h1 className="stat-card-enter visible text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl" style={{ animationDelay: '200ms' }}>
          {title}
        </h1>
      </div>
    </section>
  );
}
