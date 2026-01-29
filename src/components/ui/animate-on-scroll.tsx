"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type ScrollAnimationVariant = "from-top" | "from-bottom" | "scale-in";

const INITIAL_CLASSES: Record<ScrollAnimationVariant, string> = {
  "from-top": "opacity-0 -translate-y-12",
  "from-bottom": "opacity-0 translate-y-12",
  "scale-in": "opacity-0 scale-[0.85]",
};

const ANIMATE_CLASSES: Record<ScrollAnimationVariant, string> = {
  "from-top": "scroll-in-from-top",
  "from-bottom": "scroll-in-from-bottom",
  "scale-in": "scroll-in-scale",
};

export interface AnimateOnScrollProps {
  variant: ScrollAnimationVariant;
  children: React.ReactNode;
  className?: string;
  /** IntersectionObserver rootMargin, e.g. "0px 0px -80px 0px" to trigger earlier */
  rootMargin?: string;
  /** IntersectionObserver threshold, 0–1 */
  threshold?: number;
}

export function AnimateOnScroll({
  variant,
  children,
  className,
  rootMargin = "0px 0px -60px 0px",
  threshold = 0.1,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
          }
        }
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold]);

  const baseClasses = !inView
    ? INITIAL_CLASSES[variant]
    : ANIMATE_CLASSES[variant];

  return (
    <div ref={ref} className={cn(baseClasses, className)}>
      {children}
    </div>
  );
}
