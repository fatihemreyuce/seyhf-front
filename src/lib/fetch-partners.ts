import type { Page } from "@/types/pagination.types";
import type { PartnerResponse } from "@/types/partner.types";

const API = process.env.NEXT_PUBLIC_API_URL ?? "";
const URL = `${API}/api/v1/partners?page=0&size=50`;

function byOrder(a: PartnerResponse, b: PartnerResponse) {
  return a.orderIndex - b.orderIndex;
}

function normalizeImageUrl(url: string | undefined): string | undefined {
  if (!url || typeof url !== "string") return url;
  return url.replace(
    /^https:\/\/(localhost|127\.0\.0\.1)(:\d+)?/,
    "http://$1$2"
  );
}

export async function fetchPartners(): Promise<PartnerResponse[]> {
  try {
    const res = await fetch(URL, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const page = (await res.json()) as Page<PartnerResponse>;
    const list = page?.content ?? [];
    return [...list]
      .sort(byOrder)
      .map((p) => ({ ...p, logoUrl: normalizeImageUrl(p.logoUrl) }));
  } catch {
    return [];
  }
}
