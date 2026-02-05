import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Sparkles,
  Mail,
  Clock,
  Send,
  Headphones,
  CheckCircle2,
} from "lucide-react";

const CONTACT_POINTS = [
  {
    icon: Mail,
    label: "Form ile ulaşın",
    description: "İletişim formunu doldurun",
  },
  {
    icon: Clock,
    label: "Hızlı dönüş",
    description: "En kısa sürede yanıt",
  },
  {
    icon: Headphones,
    label: "Destek",
    description: "Size yardımcı olmaya hazırız",
  },
] as const;

export function HomepageContactSection() {
  return (
    <section className="bg-linear-to-b from-white to-gray-50/50 py-16 md:py-20">
      <div className="content-container">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-lg shadow-gray-200/50 transition-shadow hover:shadow-xl hover:shadow-gray-200/60">
            {/* Üst alan */}
            <div className="relative border-b border-gray-100 bg-(--brand-red)/5 px-8 py-10 text-center md:px-12 md:py-12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-(--brand-red)/10 shadow-inner">
                <MessageCircle
                  className="h-8 w-8 text-(--brand-red)"
                  aria-hidden
                />
              </div>
              <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-subtle">
                <Sparkles className="h-4 w-4 text-(--brand-red)" aria-hidden />
                İletişim
                <Sparkles className="h-4 w-4 text-(--brand-red)" aria-hidden />
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text-primary md:text-4xl">
                BİZİMLE İLETİŞİME GEÇİN
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-text-light">
                Sorularınız veya projeleriniz için bize ulaşın. Ekibimiz size en
                kısa sürede dönüş yapacaktır.
              </p>
            </div>

            {/* Özellik noktaları */}
            <div className="grid grid-cols-1 gap-6 border-b border-gray-100 bg-gray-50/30 px-8 py-8 md:grid-cols-3 md:gap-8 md:px-10 md:py-10">
              {CONTACT_POINTS.map(({ icon: Icon, label, description }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-3 rounded-xl bg-white p-5 text-center shadow-sm transition-colors hover:bg-(--brand-red)/5 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--brand-red)/10 text-(--brand-red)">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">{label}</p>
                    <p className="mt-0.5 text-sm text-text-light">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-4 px-8 py-8 md:flex-row md:justify-center md:gap-6 md:py-10">
              <p className="flex items-center gap-2 text-sm text-text-light">
                <CheckCircle2
                  className="h-5 w-5 shrink-0 text-green-600"
                  aria-hidden
                />
                Ücretsiz danışmanlık
              </p>
              <Button asChild className="w-full gap-2 sm:w-auto py-5 xs:py-6">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2"
                >
                  İletişim Formu
                  <Send
                    className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
