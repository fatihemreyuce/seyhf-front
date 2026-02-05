"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, CircleHelp } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "border-b border-gray-200 transition-colors last:border-b-0 hover:border-(--brand-red)/20",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = AccordionPrimitive.Item.displayName;

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between gap-3 py-5 text-left font-semibold text-text-primary transition-colors duration-300 hover:text-(--brand-red) [&[data-state=open]>.accordion-chevron]:rotate-180",
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-3">
        <CircleHelp
          aria-hidden
          className="h-5 w-5 shrink-0 text-(--brand-red)/70 transition-colors duration-300 group-hover:text-(--brand-red)"
        />
        {children}
      </span>
      <ChevronDown
        aria-hidden
        className="accordion-chevron h-5 w-5 shrink-0 text-(--brand-red) transition-transform duration-500 ease-out"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

/** Dinamik süre: içerik yüksekliğine göre açılma hızı sabit kalır (yavaş his) */
const ACCORDION_MS_PER_PX = 40;
const ACCORDION_DURATION_MIN_MS = 1200;
const ACCORDION_DURATION_MAX_MS = 8000;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const contentRef = React.useRef<HTMLDivElement>(null);

  const setRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      (contentRef as React.MutableRefObject<HTMLDivElement | null>).current =
        node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref]
  );

  React.useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el || el.getAttribute("data-state") !== "open") return;

    const apply = () => {
      const raw = getComputedStyle(el)
        .getPropertyValue("--radix-accordion-content-height")
        .trim();
      const height = parseFloat(raw) || 0;
      if (!height || !Number.isFinite(height)) return;
      const ms = Math.max(
        ACCORDION_DURATION_MIN_MS,
        Math.min(ACCORDION_DURATION_MAX_MS, height * ACCORDION_MS_PER_PX)
      );
      el.style.animationDuration = `${ms}ms`;
    };

    apply();
    const raf = requestAnimationFrame(apply);
    return () => cancelAnimationFrame(raf);
  });

  return (
    <AccordionPrimitive.Content
      ref={setRef}
      className="overflow-hidden text-text-light data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-5 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
