import { UsefulInformationResponse } from "@/types/useful.information";
import { Page } from "@/types/pagination.types";
import { fetchServer } from "@/utils/fetch-server";

const USEFUL_INFORMATION_BASE_URL = "/api/v1/useful-information";

/** https localhost/127.0.0.1 → http (SSL hatası önlemi). */
function normalizeUrl(url: string | undefined): string | undefined {
  if (!url || typeof url !== "string") return url;
  return url.replace(
    /^https:\/\/(localhost|127\.0\.0\.1)(:\d+)?/,
    "http://$1$2",
  );
}

export const getUsefulInformation = async (
  page: number,
  size: number,
): Promise<Page<UsefulInformationResponse>> => {
  const response = await fetchServer<void, Page<UsefulInformationResponse>>(
    `${USEFUL_INFORMATION_BASE_URL}?page=${page}&size=${size}`,
  );
  
  // Normalize fileUrl to fix SSL errors with localhost
  return {
    ...response,
    content: (response.content ?? []).map((item) => ({
      ...item,
      fileUrl: normalizeUrl(item.fileUrl),
    })),
  };
};

export const getUsefulInformationById = async (
  id: number,
): Promise<UsefulInformationResponse> => {
  const response = await fetchServer<void, UsefulInformationResponse>(
    `${USEFUL_INFORMATION_BASE_URL}/${id}`,
  );
  
  // Normalize fileUrl to fix SSL errors with localhost
  return {
    ...response,
    fileUrl: normalizeUrl(response.fileUrl),
  };
};
