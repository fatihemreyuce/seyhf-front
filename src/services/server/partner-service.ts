import {  PartnerResponse } from "@/types/partner.types";
import { Page } from "@/types/pagination.types";
import { fetchServer } from "@/utils/fetch-server";

const PARTNER_BASE_URL = "/api/v1/partners";

/** https localhost/127.0.0.1 → http (SSL hatası önlemi). */
function normalizeUrl(url: string | undefined | null): string | undefined | null {
  if (!url || typeof url !== "string") return url;
  return url.replace(
    /^https:\/\/(localhost|127\.0\.0\.1)(:\d+)?/,
    "http://$1$2",
  );
}

export const getPartners = async (page: number, size: number): Promise<Page<PartnerResponse>> => {
    const response = await fetchServer<void, Page<PartnerResponse>>(`${PARTNER_BASE_URL}?page=${page}&size=${size}`);
    
    // Normalize logoUrl to fix SSL errors with localhost
    return {
      ...response,
      content: (response.content ?? []).map((partner) => ({
        ...partner,
        logoUrl: normalizeUrl(partner.logoUrl),
      })),
    };
}

export const getPartnerById = async (id: number): Promise<PartnerResponse> => {
    const response = await fetchServer<void, PartnerResponse>(`${PARTNER_BASE_URL}/${id}`);
    
    // Normalize logoUrl to fix SSL errors with localhost
    return {
      ...response,
      logoUrl: normalizeUrl(response.logoUrl),
    };
}