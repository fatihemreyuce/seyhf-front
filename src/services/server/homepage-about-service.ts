import { cache } from "react";
import { HomepageAboutResponse } from "@/types/homepage.about.types";
import { fetchServer } from "@/utils/fetch-server";
import { Page } from "@/types/pagination.types";

const HOMEPAGE_ABOUT_BASE_URL = "/api/v1/homepage-about";

/** Sadece panelden veri çeker. Mock/fallback yok. */
export const getHomepageAbout = cache(async (
  page: number,
  size: number
): Promise<Page<HomepageAboutResponse>> => {
  const response = await fetchServer<void, Page<HomepageAboutResponse>>(
    `${HOMEPAGE_ABOUT_BASE_URL}?page=${page}&size=${size}`
  );
  return response;
});

/** Sadece panelden veri çeker. Mock/fallback yok. */
export const getHomepageAboutById = async (
  id: number
): Promise<HomepageAboutResponse> => {
  const response = await fetchServer<void, HomepageAboutResponse>(
    `${HOMEPAGE_ABOUT_BASE_URL}/${id}`
  );
  return response;
};
