import {
  MapPin,
  Mail,
  Phone,
  Clock,
  CalendarDays,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { ContactForm } from "./contact-form";

const CONTACT_ITEMS = [
  {
    label: "Adres",
    value: "Örnek Mah. Örnek Sk. No:1, İstanbul",
    href: "https://www.google.com/maps",
    icon: MapPin,
  },
  {
    label: "E-posta",
    value: "info@example.com",
    href: "mailto:info@example.com",
    icon: Mail,
  },
  {
    label: "Telefon",
    value: "+90 (212) 555 00 00",
    href: "tel:+902125550000",
    icon: Phone,
  },
] as const;

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.269750040882!2d28.9784!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzI5LjUiTiAyOMKwNTgnNDIuMiJF!5e0!3m2!1str!2str!4v1635000000000!5m2!1str!2str!";

export function ContactPageContent() {
  return (
    <div className="bg-gray-50/50">
      {/* Ana bölüm: İletişim bilgileri + Form */}
      <div className="content-container py-10 md:py-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Sol: İletişim bilgileri */}
          <aside className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl border border-gray-200/90 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                  <MessageCircle className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Bize ulaşın
                  </h2>
                  <p className="text-sm text-gray-500">
                    Aşağıdaki kanallardan bize ulaşabilirsiniz
                  </p>
                </div>
              </div>
              <ul className="space-y-4">
                {CONTACT_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isExternal = item.href.startsWith("http");
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors group-hover:bg-brand-red/10 group-hover:text-brand-red">
                          <Icon className="h-4 w-4" aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                            {item.label}
                          </p>
                          <p className="mt-0.5 font-medium text-gray-900 break-all group-hover:text-brand-red">
                            {item.value}
                          </p>
                        </div>
                        <ArrowRight
                          className="h-4 w-4 shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-red"
                          aria-hidden
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50/80 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <Clock className="h-4 w-4 text-brand-red" aria-hidden />
                  Çalışma saatleri
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                  <CalendarDays className="h-4 w-4 text-gray-400" aria-hidden />
                  <span>Pazartesi - Cuma: 09:00 - 18:00</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                  <CalendarDays className="h-4 w-4 text-gray-400" aria-hidden />
                  <span>Cumartesi: 10:00 - 14:00</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Sağ: Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Harita */}
      <section className="border-t border-gray-200/80 bg-white">
        <div className="content-container py-10 md:py-12">
          <div className="mb-6 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-brand-red" aria-hidden />
            <h2 className="text-lg font-bold text-gray-900">Konumumuz</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <div className="relative h-[320px] w-full md:h-[400px]">
              <iframe
                title="Konum haritası"
                src={MAP_EMBED_SRC}
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
