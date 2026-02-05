"use client";

import { usePathname } from "next/navigation";
import TopBar from "@/components/TopBar";
import type { TopBarProps } from "@/components/TopBar";

/** TopBar sadece ana sayfada görünsün; blog ve diğer sayfalarda gizli. */
export default function ConditionalTopBar(props: TopBarProps) {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <TopBar {...props} />;
}
