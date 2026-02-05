import { getFaqs } from "@/services/server/faqs-service";
import { HelpCircle } from "lucide-react";
import { FaqAccordionList } from "./homepage-faq-accordion-list";

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
    <section className="bg-white py-16 md:py-20">
      <div className="content-container">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-(--brand-red)/10">
            <HelpCircle className="h-8 w-8 text-(--brand-red)" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-subtle">
            Sıkça Sorulan Sorular
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text-primary md:text-4xl">
            SSS
          </h2>
        </div>

        <div className="mx-auto max-w-3xl">
          <FaqAccordionList faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
