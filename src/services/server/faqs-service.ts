import type { FaqsResponse } from "@/types/faqs.types";
import { fetchServer } from "@/utils/fetch-server";
import type { Page } from "@/types/pagination.types";

const FAQS_BASE_URL = "/api/v1/faqs";

export async function getFaqs(
  search: string,
  page: number,
  size: number,
  sort: string
): Promise<Page<FaqsResponse>> {
  const response = await fetchServer<void, Page<FaqsResponse>>(
    `${FAQS_BASE_URL}?search=${encodeURIComponent(
      search
    )}&page=${page}&size=${size}&sort=${encodeURIComponent(sort)}`
  );
  return response;
}

export async function getFaqById(id: number): Promise<FaqsResponse> {
  const response = await fetchServer<void, FaqsResponse>(
    `${FAQS_BASE_URL}/${id}`
  );
  return response;
}
