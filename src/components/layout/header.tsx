"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import logoHome2 from "@/app/assets/images/logo/logo-home2.png";

const navItems = [
  { label: "Anasayfa", href: "/" },
  { label: "Hakkımızda", href: "/about" },
  { label: "Hizmetlerimiz", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Faydalı Bilgiler", href: "/useful-information" },
  { label: "İletişim", href: "/contact" },
];

export default function Header() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

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

  return (
    <header
      className="sticky top-0 z-50 border-b border-gray-100 bg-white transition-transform duration-300 ease-out"
      style={{
        transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <div className="content-container">
        <div className="flex h-20 items-center justify-between pt-3 sm:h-24 sm:pt-4 md:h-28 md:pt-4">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/">
              <Image
                src={logoHome2}
                alt="BIXOS Logo"
                width={150}
                height={50}
                className="w-24 sm:w-32 md:w-[150px]"
                style={{ width: "auto", height: "auto" }}
                sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 150px"
                loading="eager"
                unoptimized
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 items-stretch justify-center gap-6 xl:gap-8 self-stretch">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative flex items-center"
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span
                  className={`font-extrabold text-sm xl:text-base transition-colors duration-200 ${
                    hoveredItem === item.label
                      ? "text-[#ED3237]"
                      : "text-[#282A2E]"
                  }`}
                >
                  {item.label}
                </span>
                {/* Underline: header alt sınırında */}
                <span
                  className={`absolute inset-x-0 bottom-0 h-0.5 bg-[#ED3237] transition-transform duration-300 ease-out ${
                    hoveredItem === item.label
                      ? "scale-x-100 origin-left"
                      : "scale-x-0 origin-right"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block shrink-0">
            <Button className="px-6 xl:px-10 py-3 xl:py-5 text-xs xl:text-base">
              Get A Quote <span className="ml-1">+</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden shrink-0 p-2 text-[#282A2E] hover:text-[#ED3237] transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
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
          className={`lg:hidden border-t border-gray-100 overflow-hidden ${
            mobileMenuOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
          }`}
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
                className={`flex items-center justify-between py-3 px-4 hover:bg-gray-50 rounded-lg transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transform: mobileMenuOpen
                    ? "translateY(0)"
                    : "translateY(-10px)",
                  transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${mobileMenuOpen ? `${index * 0.06}s` : "0s"}`,
                }}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span
                  className={`font-extrabold text-base transition-colors duration-200 ${
                    hoveredItem === item.label
                      ? "text-[#ED3237]"
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
                transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${mobileMenuOpen ? `${navItems.length * 0.06}s` : "0s"}`,
              }}
            >
              <Button className="w-full px-6 py-4 ">
                Get A Quote <span className="ml-1">+</span>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
