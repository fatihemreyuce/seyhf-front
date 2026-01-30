import { ServiceCategoryResponse } from "@/types/service.categories.types";
import { fetchServer } from "@/utils/fetch-server";
import { Page } from "@/types/pagination.types";

const SERVICE_CATEGORIES_BASE_URL = "/api/v1/service-categories";

export const getServiceCategories = async (
  page: number,
  size: number,
): Promise<Page<ServiceCategoryResponse>> => {
  const response = await fetchServer<void, Page<ServiceCategoryResponse>>(
    `${SERVICE_CATEGORIES_BASE_URL}?page=${page}&size=${size}`,
  );
  return response;
};

export const getServiceCategoryById = async (
  id: string,
): Promise<ServiceCategoryResponse> => {
  const response = await fetchServer<void, ServiceCategoryResponse>(
    `${SERVICE_CATEGORIES_BASE_URL}/${id}`,
  );
  return response;
};

export const getServiceCategoryByService = async (
  id: string,
): Promise<ServiceCategoryResponse> => {
  const response = await fetchServer<void, ServiceCategoryResponse>(
    `${SERVICE_CATEGORIES_BASE_URL}/services/${id}`,
  );
  return response;
};
