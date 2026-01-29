import type { Page } from "@/types/pagination.types";
import type { CircularResponse } from "@/types/circulars.types";
import type { PartnerResponse } from "@/types/partner.types";
import type { SliderResponse } from "@/types/slider.types";

const API = process.env.NEXT_PUBLIC_API_URL ?? "";

/** https localhost/127.0.0.1 → http (SSL hatası önlemi). */
function normalizeUrl(url: string | undefined): string | undefined {
  if (!url || typeof url !== "string") return url;
  return url.replace(
    /^https:\/\/(localhost|127\.0\.0\.1)(:\d+)?/,
    "http://$1$2",
  );
}

function byOrder<T extends { orderIndex: number }>(a: T, b: T) {
  return a.orderIndex - b.orderIndex;
}

// ---- Sliders ----

export async function fetchSliders(): Promise<SliderResponse[]> {
  try {
    const res = await fetch(`${API}/api/v1/sliders?page=0&size=50`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const page = (await res.json()) as Page<SliderResponse>;
    const list = page?.content ?? [];
    return [...list]
      .sort(byOrder)
      .map((s) => ({ ...s, imageUrl: normalizeUrl(s.imageUrl) }));
  } catch {
    return [];
  }
}

// ---- Partners ----

export async function fetchPartners(): Promise<PartnerResponse[]> {
  try {
    const res = await fetch(`${API}/api/v1/partners?page=0&size=50`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const page = (await res.json()) as Page<PartnerResponse>;
    const list = page?.content ?? [];
    return [...list]
      .sort(byOrder)
      .map((p) => ({ ...p, logoUrl: normalizeUrl(p.logoUrl) }));
  } catch {
    return [];
  }
}

export async function fetchPartnerById(
  id: number,
): Promise<PartnerResponse | null> {
  try {
    const res = await fetch(`${API}/api/v1/partners/${id}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as PartnerResponse;
    return { ...data, logoUrl: normalizeUrl(data.logoUrl) };
  } catch {
    return null;
  }
}

// ---- Circulars ----

export async function fetchCirculars(): Promise<CircularResponse[]> {
  try {
    const res = await fetch(`${API}/api/v1/circulars?page=0&size=50`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const page = (await res.json()) as Page<CircularResponse>;
    const list = page?.content ?? [];
    return list.map((c) => ({ ...c, fileUrl: normalizeUrl(c.fileUrl) }));
  } catch {
    return [];
  }
}

// ---- Blogs ----

export interface BlogPost {
  id: number;
  title: string;
  href: string;
}

const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Standard Size Of Business Agency Consulating Management.",
    href: "/blog/1",
  },
  {
    id: 2,
    title: "Standard Size Of Business Agency Consulating Management.",
    href: "/blog/2",
  },
  {
    id: 3,
    title: "Standard Size Of Business Agency Consulating Management.",
    href: "/blog/3",
  },
];

export async function fetchBlogs(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API}/api/v1/blogs?page=0&size=10`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) return FALLBACK_BLOG_POSTS;
    const page = (await res.json()) as Page<{
      id: number;
      title: string;
      slug?: string;
    }>;
    const list = page?.content ?? [];
    if (list.length === 0) return FALLBACK_BLOG_POSTS;
    return list.map((b) => ({
      id: b.id,
      title: b.title,
      href: `/blog/${b.slug ?? b.id}`,
    }));
  } catch {
    return FALLBACK_BLOG_POSTS;
  }
}
