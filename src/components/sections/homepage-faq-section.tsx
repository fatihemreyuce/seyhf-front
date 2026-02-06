import Image from "next/image";
import { getFaqs } from "@/services/server/faqs-service";
import { HelpCircle, Sparkles } from "lucide-react";
import { FaqAccordionList } from "./homepage-faq-accordion-list";

const FAQ_IMAGE =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80";

const HOMEPAGE_FAQ_LIMIT = 6;

export async function HomepageFaqSection() {
  let faqs;

  try {
    const response = await getFaqs("", 0, HOMEPAGE_FAQ_LIMIT, "orderIndex,asc");
    faqs = (response?.content ?? [])
      .slice()
      .sort((a, b) => a.orderIndex - b.orderIndex);
  } catch (error) {
    console.error("Failed to fetch FAQs:", error);
    faqs = [];
  }

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50/80 py-16 md:py-20">
      <div className="content-container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">
          {/* Sol: Başlık, açıklama, resim */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <p className="flex items-center gap-2 text-sm font-medium text-text-subtle">
              <Sparkles className="h-4 w-4 text-(--brand-red)" aria-hidden />
              Sıkça Sorulan Sorular
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-text-primary md:text-4xl">
              Merak ettikleriniz ve{" "}
              <span className="text-(--brand-red)">cevaplar</span>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-text-light">
              Aşağıda en çok sorulan soruları ve cevaplarını bulabilirsiniz.
              Aradığınızı bulamazsanız bizimle iletişime geçebilirsiniz.
            </p>
            <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-100 shadow-lg">
              <Image
                src={FAQ_IMAGE}
                alt="Sıkça sorulan sorular"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Sağ: Accordion */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--brand-red)/10 text-(--brand-red)">
                  <HelpCircle className="h-6 w-6" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-text-primary">SSS</h3>
                  <p className="text-sm text-text-light">
                    Soruları açarak cevapları okuyabilirsiniz
                  </p>
                </div>
              </div>
              <FaqAccordionList faqs={faqs} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
