import { Sparkles, Mail, Zap, ShieldCheck } from "lucide-react";
import { FooterNewsletterForm } from "@/components/layout/footer-newsletter-form";

const BENEFITS = [
  {
    icon: Mail,
    text: "Kampanya ve duyurulardan ilk siz haberdar olun",
  },
  {
    icon: Zap,
    text: "Özel içerikler ve fırsatlar",
  },
  {
    icon: ShieldCheck,
    text: "İstediğiniz zaman abonelikten çıkabilirsiniz",
  },
] as const;

export function HomepageNewsletterSection() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      aria-labelledby="newsletter-heading"
    >
      {/* Arka plan: gradient + hafif desen */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-(--brand-red)/5 via-(--brand-red)/2 to-transparent" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="content-container">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
          {/* Sol: Başlık + faydalar */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-(--brand-red)/20 bg-(--brand-red)/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-(--brand-red)">
              <Sparkles className="h-4 w-4" aria-hidden />
              Bülten
            </div>
            <h2
              id="newsletter-heading"
              className="mt-6 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-[2.5rem]"
            >
              Bültene abone olun
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-text-light">
              Güncel haberler ve kampanyalardan haberdar olun. Ayda en fazla
              birkaç e-posta; spam yok.
            </p>
            <ul className="mt-8 space-y-4">
              {BENEFITS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--brand-red)/10 text-(--brand-red)">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="pt-1.5 text-sm font-medium text-text-light">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sağ: Form kartı */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white/90 shadow-xl shadow-gray-200/50 ring-1 ring-gray-100/80 backdrop-blur-sm transition-shadow hover:shadow-2xl hover:shadow-gray-200/60">
              <div className="absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-(--brand-red)/5 blur-2xl" />
              <div className="relative px-6 py-8 sm:px-10 sm:py-10">
                <FooterNewsletterForm variant="light" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
