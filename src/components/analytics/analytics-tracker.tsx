"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  getOrCreateVisitorId,
  getOrCreateSessionId,
} from "@/lib/analytics-cookies";
import { trackPageView } from "@/services/client/analytics-service";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const sentRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || typeof document === "undefined") return;
    const key = pathname;
    if (sentRef.current === key) return;
    sentRef.current = key;

    const visitorId = getOrCreateVisitorId();
    const sessionId = getOrCreateSessionId();

    trackPageView(
      {
        pagePath: pathname,
        pageTitle: document.title || "",
        referrer:
          typeof document.referrer === "string" ? document.referrer : "",
      },
      visitorId,
      sessionId
    ).catch(() => {
      sentRef.current = null;
    });
  }, [pathname]);

  return null;
}
