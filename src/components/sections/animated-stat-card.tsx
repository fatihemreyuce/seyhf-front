"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedStatCardProps {
  value: number;
  title: string;
  index?: number;
}

export function AnimatedStatCard({ value, title, index = 0 }: AnimatedStatCardProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2500;
    const frameRate = 60;
    const totalFrames = Math.round((duration / 1000) * frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeProgress * value);

      if (frame === totalFrames) {
        setCount(value);
        clearInterval(counter);
      } else {
        setCount(currentCount);
      }
    }, 1000 / frameRate);

    return () => clearInterval(counter);
  }, [isVisible, value]);

  return (
    <div
      ref={cardRef}
      className={`stat-card-enter stat-card-delay-${index % 4} group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
        isVisible ? "visible" : ""
      }`}
      suppressHydrationWarning
    >
      <div className="relative z-10 flex flex-col items-center justify-center" suppressHydrationWarning>
        <div className="text-4xl font-extrabold text-(--brand-red) md:text-5xl" suppressHydrationWarning>
          +{count >= 1000 ? `${(count / 1000).toFixed(count >= 1000 && count < 2000 ? 1 : 0)}K` : count}
        </div>
        <div className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-[#999]">
          {title}
        </div>
      </div>
      <div className="absolute inset-0 bg-(--brand-red)/3 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}
