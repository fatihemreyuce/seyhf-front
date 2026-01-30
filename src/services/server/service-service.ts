import { ServiceResponse } from "@/types/service.types";
import { Page } from "@/types/pagination.types";
import { fetchServer } from "@/utils/fetch-server";

const SERVICE_BASE_URL = "/api/v1/services";

export const getServices = async (
  page: number,
  size: number,
): Promise<Page<ServiceResponse>> => {
  const response = await fetchServer<void, Page<ServiceResponse>>(
    `${SERVICE_BASE_URL}?page=${page}&size=${size}`,
  );
  return response;
};

export const getServiceById = async (id: number): Promise<ServiceResponse> => {
  const response = await fetchServer<void, ServiceResponse>(
    `${SERVICE_BASE_URL}/${id}`,
  );
  return response;
};
