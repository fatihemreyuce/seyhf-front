import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  Instagram,
  Linkedin,
  FileText,
  Cookie,
} from "lucide-react";
import logoFooter from "@/app/assets/images/logo/logo-footer.png";

const FOOTER_LINKS_1 = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/about" },
  { label: "Hizmetlerimiz", href: "/services" },
  { label: "Blog", href: "/blog" },
];

const FOOTER_LINKS_2 = [
  { label: "Referanslar", href: "/references" },
  { label: "Faydalı Bilgiler", href: "/useful-information" },
  { label: "İletişim", href: "/contact" },
];

export interface FooterProps {
  phoneNumber: string;
  email: string;
  address: string;
  instagramUrl: string;
  linkedinUrl: string;
  logoUrl?: string | null;
}

function normalizeLogoUrl(url: string | null | undefined): string | null {
  if (!url?.trim()) return null;
  return url
    .replace(/^https:\/\/(localhost|127\.0\.0\.1|::1)(:\d+)?/, "http://$1$2")
    .trim();
}

export default function Footer({
  phoneNumber,
  email,
  address,
  instagramUrl,
  linkedinUrl,
  logoUrl,
}: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-gray-900 text-white">
      <div className="content-container py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Marka */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex h-12 items-center">
              <Image
                src={normalizeLogoUrl(logoUrl) || logoFooter}
                alt="Logo"
                width={140}
                height={48}
                className="h-10 max-h-12 w-auto max-w-[140px] object-contain object-left"
                unoptimized={!!normalizeLogoUrl(logoUrl)}
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              Profesyonel hizmetler ve müşteri odaklı çözümlerle yanınızdayız.
            </p>
          </div>

          {/* Keşfet */}
          <div className="lg:col-span-4">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
              <ArrowRight className="h-4 w-4 text-(--brand-red)" aria-hidden />
              Keşfet
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              <div>
                {FOOTER_LINKS_1.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-sm text-gray-400 transition-colors hover:text-(--brand-red)"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div>
                {FOOTER_LINKS_2.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-sm text-gray-400 transition-colors hover:text-(--brand-red)"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* İletişim (Settings'ten) */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
              <Mail className="h-4 w-4 text-(--brand-red)" aria-hidden />
              İletişim
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href={
                    address.startsWith("http")
                      ? address
                      : `https://www.google.com/maps?q=${encodeURIComponent(
                          address,
                        )}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 transition-colors hover:text-(--brand-red)"
                >
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-(--brand-red)"
                    aria-hidden
                  />
                  <span>{address}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 transition-colors hover:text-(--brand-red)"
                >
                  <Mail
                    className="h-4 w-4 shrink-0 text-(--brand-red)"
                    aria-hidden
                  />
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 transition-colors hover:text-(--brand-red)"
                >
                  <Phone
                    className="h-4 w-4 shrink-0 text-(--brand-red)"
                    aria-hidden
                  />
                  {phoneNumber}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-800/80 text-gray-400 transition-colors hover:bg-(--brand-red) hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-800/80 text-gray-400 transition-colors hover:bg-(--brand-red) hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Alt çizgi */}
      <div className="border-t border-white/10 bg-gray-950/80 py-5">
        <div className="content-container flex flex-col items-center justify-between gap-3 text-center text-sm text-gray-500 sm:flex-row">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} Tüm hakları saklıdır.
            <Heart
              className="inline h-4 w-4 fill-(--brand-red) text-(--brand-red)"
              aria-hidden
            />
          </p>
          <nav
            className="flex flex-wrap items-center justify-center gap-4"
            aria-label="Yasal"
          >
            <Link
              href="/privacy"
              className="flex items-center gap-1.5 transition-colors hover:text-(--brand-red)"
            >
              <FileText className="h-4 w-4" aria-hidden />
              Gizlilik Politikası
            </Link>
            <Link
              href="/cookie-policy"
              className="flex items-center gap-1.5 transition-colors hover:text-(--brand-red)"
            >
              <Cookie className="h-4 w-4" aria-hidden />
              Çerez Politikası
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
