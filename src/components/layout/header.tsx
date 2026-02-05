"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoHome2 from "@/app/assets/images/logo/logo-home2.png";

const BRAND_RED = "var(--brand-red)";
const BLOG_HEADER_GRAY = "#8d929b";

const navItems = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/about" },
  { label: "Hizmetlerimiz", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Referanslarımız", href: "/references" },
  { label: "Faydalı Bilgiler", href: "/useful-information" },
  { label: "İletişim", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const updateScroll = () => {
      const y = window.scrollY ?? document.documentElement.scrollTop;
      setIsScrolled(y > 70);
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY ?? document.documentElement.scrollTop;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY ?? document.documentElement.scrollTop;
        if (y <= 24) {
          setHeaderVisible(true);
          lastScrollY.current = y;
          ticking.current = false;
          return;
        }
        const delta = y - lastScrollY.current;
        if (Math.abs(delta) < 10) {
          ticking.current = false;
          return;
        }
        if (delta > 0) setHeaderVisible(false);
        else setHeaderVisible(true);
        lastScrollY.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = !isScrolled;
  const isBlogPage = pathname.startsWith("/blog");
  const isServicePage = pathname.startsWith("/services");
  const isUsefulInfoPage = pathname.startsWith("/useful-information");
  const isPartnersPage = pathname.startsWith("/partners");
  const isReferencesPage = pathname.startsWith("/references");
  const isGrayHeroPage =
    isBlogPage ||
    isServicePage ||
    isUsefulInfoPage ||
    isPartnersPage ||
    isReferencesPage;

  /* Pages with gray/dark hero: Blog, Services, Useful Information, Partners, References */
  const navTextClass =
    transparent && isGrayHeroPage
      ? "text-white hover:text-white/95"
      : "text-[#282A2E] hover:text-[#282A2E]";
  const navActiveClass = "text-[var(--brand-red)]";
  const borderClass = transparent
    ? isGrayHeroPage
      ? "border-white/20"
      : "border-gray-200 bg-white"
    : "border-gray-200/80 bg-white/90 backdrop-blur-md";

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ease-out ${borderClass}`}
      style={{
        transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
        ...(transparent && isGrayHeroPage
          ? { backgroundColor: BLOG_HEADER_GRAY }
          : {}),
      }}
    >
      <div className="content-container relative z-10">
        <div className="flex h-20 items-center justify-between pt-3 sm:h-24 sm:pt-4 md:h-28 md:pt-4">
          {/* Logo */}
          <div className="mr-6 xl:mr-8 shrink-0">
            <Link href="/" className="block">
              <Image
                src={logoHome2}
                alt="BIXOS Logo"
                width={150}
                height={50}
                className={`w-24 transition-all duration-300 sm:w-32 md:w-[150px] ${
                  transparent && isBlogPage ? "brightness-0 invert" : ""
                }`}
                style={{ width: "auto", height: "auto" }}
                sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 150px"
                loading="eager"
                unoptimized
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 items-stretch justify-center gap-4 xl:gap-6 self-stretch">
            {navItems.map((item) => {
              const active = hoveredItem === item.label || isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative flex items-center"
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span
                    className={`font-extrabold text-xs xl:text-sm 2xl:text-base transition-colors duration-200 whitespace-nowrap ${navTextClass} ${
                      active ? navActiveClass : ""
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className="absolute inset-x-0 bottom-0 h-0.5 transition-transform duration-300 ease-out"
                    style={{
                      backgroundColor: BRAND_RED,
                      transform: active ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: active ? "left" : "right",
                    }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block shrink-0 ml-6 xl:ml-10">
            <Link href="/contact">
              <Button
                className="cursor-pointer px-4 xl:px-6 2xl:px-10 py-5 xl:py-5 2xl:py-6 text-xs xl:text-sm 2xl:text-base whitespace-nowrap"
                style={{ backgroundColor: BRAND_RED }}
              >
                Teklif Al <span className="ml-1">+</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden shrink-0 p-2 transition-all duration-300 ${
              transparent && isBlogPage
                ? "text-white hover:opacity-90"
                : "text-[#282A2E] hover:text-(--brand-red)"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menüyü Aç/Kapat"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ease-in-out ${
                  mobileMenuOpen
                    ? "opacity-0 rotate-90 scale-0"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ease-in-out ${
                  mobileMenuOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-0"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden border-t overflow-hidden ${
            mobileMenuOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
          } ${transparent ? "border-white/20" : "border-gray-100"}`}
          style={{
            transform: mobileMenuOpen ? "translateY(0)" : "translateY(-30px)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <nav className="flex flex-col gap-4 py-4">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-100" : "opacity-0"
                } ${transparent ? "hover:bg-white/10" : "hover:bg-gray-50"}`}
                style={{
                  transform: mobileMenuOpen
                    ? "translateY(0)"
                    : "translateY(-10px)",
                  transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${
                    mobileMenuOpen ? `${index * 0.06}s` : "0s"
                  }`,
                }}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span
                  className={`font-extrabold text-base transition-colors duration-200 ${
                    hoveredItem === item.label || isActive(item.href)
                      ? "text-(--brand-red)"
                      : "text-[#282A2E]"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <div
              className={`pt-2 px-4 transition-all duration-300 ${
                mobileMenuOpen ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transform: mobileMenuOpen
                  ? "translateY(0)"
                  : "translateY(-10px)",
                transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${
                  mobileMenuOpen ? `${navItems.length * 0.06}s` : "0s"
                }`,
              }}
            >
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gray-900 text-white px-6 py-5 xs:py-6 transition-colors duration-300 hover:bg-brand-red hover:text-white">
                  Teklif Al <span className="ml-1">+</span>
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
