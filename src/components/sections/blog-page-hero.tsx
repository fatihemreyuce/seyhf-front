import Link from "next/link";
import Image from "next/image";

import ellipse1 from "@/app/assets/images/mark-page/ellipse1.png";
import Ellipse2 from "@/app/assets/images/mark-page/Ellipse2.png";
import markPage from "@/app/assets/images/mark-page/mark-page.png";

/** SS’deki gibi: düz gri, kırmızı eğri, iki kesikli daire (assets), sağ üst koyu şekil (assets) */
const HERO_GRAY = "#8d929b";

export function BlogPageHero({ basePath = "" }: { basePath?: string }) {
  const rootHref = basePath ? `${basePath}/` : "/";
  const blogHref = basePath ? `${basePath}/blog` : "/blog";
  return (
    <section
      className="relative min-h-[260px] overflow-hidden py-20 md:min-h-[320px] md:py-28 lg:min-h-[360px]"
      style={{ backgroundColor: HERO_GRAY }}
    >
      {/* Kırmızı eğri — sol üstten sağa, yukarı sonra aşağı (SS’deki gibi) */}
      <svg
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-1 h-full w-full"
        viewBox="0 0 1200 500"
        preserveAspectRatio="xMinYMid slice"
        fill="none"
      >
        <path
          d="M -60 120 Q 180 60 420 100 T 900 200 T 1300 280"
          stroke="var(--brand-red)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Sol üst: iki konsantrik kesikli daire — ellipse1 + Ellipse2 (assets, SS’deki gibi) */}
      <div className="pointer-events-none absolute left-6 top-[18%] z-1 md:left-10 md:top-[15%]">
        <Image
          src={ellipse1}
          alt=""
          width={200}
          height={200}
          className="h-28 w-28 object-contain opacity-50 md:h-36 md:w-36 lg:h-40 lg:w-40"
        />
      </div>
      <div className="pointer-events-none absolute left-10 top-[20%] z-1 md:left-14 md:top-[17%]">
        <Image
          src={Ellipse2}
          alt=""
          width={160}
          height={160}
          className="h-24 w-24 object-contain opacity-55 md:h-32 md:w-32 lg:h-36 lg:w-36"
        />
      </div>

      {/* Sağ üst: koyu soyut şekil — mark-page.png (assets, SS’deki gibi) */}
      <div className="pointer-events-none absolute right-0 top-0 z-1 opacity-90">
        <Image
          src={markPage}
          alt=""
          width={420}
          height={320}
          className="h-64 w-80 object-contain object-top-right md:h-80 md:w-96 lg:h-96 lg:w-md"
        />
      </div>

      {/* İçerik */}
      <div className="content-container relative z-10 flex min-h-[260px] flex-col items-center justify-center text-center md:min-h-[320px] lg:min-h-[360px]">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl xl:text-6xl">
          Blog Page
        </h1>
        <nav
          className="mt-3 flex items-center gap-2 text-sm text-white md:mt-4 md:text-base"
          aria-label="Breadcrumb"
        >
          <Link href={rootHref} className="transition-opacity hover:opacity-90">
            Home Page
          </Link>
          <span aria-hidden className="opacity-80">
            &gt;
          </span>
          <Link href={blogHref} className="transition-opacity hover:opacity-90">
            Blog Page
          </Link>
        </nav>
      </div>
    </section>
  );
}
