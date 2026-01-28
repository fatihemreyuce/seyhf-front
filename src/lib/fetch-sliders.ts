import type { Page } from "@/types/pagination.types";
import type { SliderResponse } from "@/types/slider.types";

const API = process.env.NEXT_PUBLIC_API_URL ?? "";
const URL = `${API}/api/v1/sliders?page=0&size=50`;

function byOrder(a: SliderResponse, b: SliderResponse) {
  return a.orderIndex - b.orderIndex;
}

/** https localhost/127.0.0.1 → http (SSL hatası önlemi). */
function normalizeImageUrl(url: string | undefined): string | undefined {
  if (!url || typeof url !== "string") return url;
  return url.replace(
    /^https:\/\/(localhost|127\.0\.0\.1)(:\d+)?/,
    "http://$1$2"
  );
}

/**
 * Panel API'sinden slider listesini çeker. getSliders (slider-service) modül
 * yükleme hatası verdiği için fetch ile kullanılıyor; endpoint aynı.
 */
export async function fetchSliders(): Promise<SliderResponse[]> {
  try {
    const res = await fetch(URL, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const page = (await res.json()) as Page<SliderResponse>;
    const list = page?.content ?? [];
    return [...list]
      .sort(byOrder)
      .map((s) => ({ ...s, imageUrl: normalizeImageUrl(s.imageUrl) }));
  } catch {
    return [];
  }
}
