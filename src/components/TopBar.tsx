import { MapPin, Instagram, Linkedin } from "lucide-react";

export interface TopBarProps {
  address: string;
  email: string;
  instagramUrl: string;
  linkedinUrl: string;
}

export default function TopBar({
  address,
  email,
  instagramUrl,
  linkedinUrl,
}: TopBarProps) {
  return (
    <div className="bg-black text-white py-2 sm:py-2.5">
      <div className="content-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
          {/* Left Section - Address */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate max-w-[200px] sm:max-w-none">{address}</span>
          </div>

          {/* Middle Section - Email */}
          <div className="flex items-center order-3 sm:order-2">
            <a
              href={`mailto:${email}`}
              className="text-glitch cursor-pointer text-xs sm:text-sm whitespace-nowrap"
            >
              {email.toUpperCase()}
            </a>
          </div>

          {/* Right Section - Social Media Icons (Settings'ten) */}
          <div className="flex items-center gap-3 sm:gap-4 order-2 sm:order-3">
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-red transition-colors shrink-0"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-red transition-colors shrink-0"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
