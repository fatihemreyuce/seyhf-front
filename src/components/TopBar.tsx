import { MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-black text-white py-2 sm:py-2.5">
      <div className="content-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
          {/* Left Section - Address */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate max-w-[200px] sm:max-w-none">
              1247/Plot No. 39, 15th Phase, New York.
            </span>
          </div>

          {/* Middle Section - Email */}
          <div className="flex items-center order-3 sm:order-2">
            <a
              href="mailto:hello@creativemela.com"
              className="text-glitch cursor-pointer text-xs sm:text-sm whitespace-nowrap"
            >
              HELLO.CREATIVEMELA.COM
            </a>
          </div>

          {/* Right Section - Social Media Icons */}
          <div className="flex items-center gap-3 sm:gap-4 order-2 sm:order-3">
            <a
              href="#"
              className="hover:text-red-500 transition-colors shrink-0"
              aria-label="Facebook"
            >
              <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
            <a
              href="#"
              className="hover:text-red-500 transition-colors shrink-0"
              aria-label="Instagram"
            >
              <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
            <a
              href="#"
              className="hover:text-red-500 transition-colors shrink-0"
              aria-label="Twitter"
            >
              <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
            <a
              href="#"
              className="hover:text-red-500 transition-colors shrink-0"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
