import type { SettingsResponse } from "@/types/settings.types";
import { fetchServer } from "@/utils/fetch-server";
import { Page } from "@/types/pagination.types";

const SETTINGS_BASE_URL = "/api/v1/settings";

export const getSettings = async (
  search: string,
  page: number,
  size: number,
  sort: string
): Promise<Page<SettingsResponse>> => {
  const response = await fetchServer<void, Page<SettingsResponse>>(
    `${SETTINGS_BASE_URL}?search=${search}&page=${page}&size=${size}&sort=${sort}`
  );
  return response;
};
