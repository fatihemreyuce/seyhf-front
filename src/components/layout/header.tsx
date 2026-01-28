"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import logoHome2 from "@/app/assets/images/logo/logo-home2.png";

const navItems = [
  { label: "Anasayfa", href: "/", },
  { label: "Hakkımızda", href: "/about",  },
  { label: "Hizmetlerimiz", href: "/services",  },
  { label: "Blog", href: "/blog",  },
  {label: "Referanslarımız", href: "/references",  },
  {label:"Partnerlerimiz", href: "/partners",  },
  {label:"Faydalı Bilgiler", href: "/useful-information",  },
  {label:"SSS", href: "/faq",  },
  { label: "İletişim", href: "/contact",  },
];

export default function Header() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 sm:h-24 md:h-28 py-3 sm:py-4">
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
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative group"
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-extrabold text-sm xl:text-base transition-colors duration-200 ${
                      hoveredItem === item.label
                        ? "text-[#ED3237]"
                        : "text-[#282A2E]"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {/* Animated Underline */}
                <span
                  className={`absolute bottom-0 top-16 left-0 right-0 h-0.5 bg-[#ED3237] transition-transform duration-300 ease-out ${
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
            <Button className="px-6 xl:px-10 py-3 xl:py-5 text-xs xl:text-sm">
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
            mobileMenuOpen
              ? "max-h-[800px] opacity-100"
              : "max-h-0 opacity-0"
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
                  mobileMenuOpen
                    ? "opacity-100"
                    : "opacity-0"
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
                mobileMenuOpen
                  ? "opacity-100"
                  : "opacity-0"
              }`}
              style={{
                transform: mobileMenuOpen
                  ? "translateY(0)"
                  : "translateY(-10px)",
                transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${mobileMenuOpen ? `${navItems.length * 0.06}s` : "0s"}`,
              }}
            >
              <Button className="w-full px-6 py-4 text-sm">
                Get A Quote <span className="ml-1">+</span>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
