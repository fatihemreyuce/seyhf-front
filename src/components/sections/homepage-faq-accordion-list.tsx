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
      type="single"
      collapsible
      defaultValue={`faq-${faqs[0]?.id ?? "item-1"}`}
    >
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
          <AccordionTrigger>{stripHtml(faq.question)}</AccordionTrigger>
          <AccordionContent>{stripHtml(faq.answer)}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
