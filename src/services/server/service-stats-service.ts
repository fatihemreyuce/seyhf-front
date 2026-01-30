import { ServiceStatsResponse } from "@/types/service.stats.types";
import { fetchServer } from "@/utils/fetch-server";
import { Page } from "@/types/pagination.types";

const SERVICE_STATS_BASE_URL = "/api/v1/service-stats";

export const getServiceStats = async (
  page: number,
  size: number,
): Promise<Page<ServiceStatsResponse>> => {
  const response = await fetchServer<void, Page<ServiceStatsResponse>>(
    `${SERVICE_STATS_BASE_URL}?page=${page}&size=${size}`,
  );
  return response;
};

export const getServiceStatsById = async (
  id: number,
): Promise<ServiceStatsResponse> => {
  const response = await fetchServer<void, ServiceStatsResponse>(
    `${SERVICE_STATS_BASE_URL}/${id}`,
  );
  return response;
};
