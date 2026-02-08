"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqsResponse } from "@/types/faqs.types";
import { stripHtml } from "@/lib/utils";

interface FaqAccordionListProps {
  faqs: FaqsResponse[];
}

export function FaqAccordionList({ faqs }: FaqAccordionListProps) {
  return (
    <Accordion
      type="multiple"
      defaultValue={faqs[0] ? [`faq-${faqs[0].id}`] : []}
    >
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
          <AccordionTrigger>{stripHtml(faq.question)}</AccordionTrigger>
          <AccordionContent className="max-h-56 overflow-y-auto pr-1">
            {stripHtml(faq.answer)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
