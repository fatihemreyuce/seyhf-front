"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { PageLoading } from "@/components/loading/page-loading";

const ROUTE_LOADING_DELAY_MS = 150;
const ROUTE_LOADING_MS = 600;

/** Route değişince global loading overlay gösterir */
export function RouteLoadingOverlay() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirst = useRef(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    const showT = setTimeout(() => setLoading(true), ROUTE_LOADING_DELAY_MS);
    const hideT = setTimeout(() => setLoading(false), ROUTE_LOADING_MS);
    return () => {
      clearTimeout(showT);
      clearTimeout(hideT);
    };
  }, [pathname, searchParams?.toString()]);

  if (!loading) return null;
  return <PageLoading />;
}
