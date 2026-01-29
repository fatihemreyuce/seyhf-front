import { CircularResponse } from "@/types/circulars.types";
import { Page } from "@/types/pagination.types";
import { fetchServer } from "@/utils/fetch-server";

const CIRCULARS_BASE_URL = "/api/v1/circulars";

export const getCirculars = async (
  page: number,
  size: number,
): Promise<Page<CircularResponse>> => {
  const response = await fetchServer<void, Page<CircularResponse>>(
    `${CIRCULARS_BASE_URL}?page=${page}&size=${size}`,
  );
  return response;
};

export const getCircularById = async (
  id: number,
): Promise<CircularResponse> => {
  const response = await fetchServer<void, CircularResponse>(
    `${CIRCULARS_BASE_URL}/${id}`,
  );
  return response;
};
