import type { officialPageResponse } from "@/types/official.page";
import { fetchServer } from "@/utils/fetch-server";
import type { Page } from "@/types/pagination.types";

const OFFICIAL_PAGE_BASE_URL = "/api/v1/official-page";

function normalizeToPage(
  raw: Page<officialPageResponse> | officialPageResponse | null | undefined,
  page: number,
  size: number
): Page<officialPageResponse> {
  if (
    raw &&
    typeof raw === "object" &&
    "content" in raw &&
    Array.isArray((raw as Page<officialPageResponse>).content)
  ) {
    return raw as Page<officialPageResponse>;
  }
  if (
    raw &&
    typeof raw === "object" &&
    ("description" in raw || "documents" in raw || "qualityPolitics" in raw)
  ) {
    return {
      content: [raw as officialPageResponse],
      size: 1,
      number: page,
      totalElements: 1,
      totalPages: 1,
    };
  }
  return {
    content: [],
    size,
    number: page,
    totalElements: 0,
    totalPages: 0,
  };
}

export async function getOfficialPage(
  page: number,
  size: number
): Promise<Page<officialPageResponse>> {
  const raw = await fetchServer<
    void,
    Page<officialPageResponse> | officialPageResponse
  >(`${OFFICIAL_PAGE_BASE_URL}?page=${page}&size=${size}`);
  return normalizeToPage(raw, page, size);
}
