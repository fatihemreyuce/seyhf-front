import { ReferenceResponse } from "@/types/references.types";
import { Page } from "@/types/pagination.types";
import { fetchServer } from "@/utils/fetch-server";

const REFERENCES_BASE_URL = "/api/v1/references";

export const getReferences = async (
  page: number,
  size: number
): Promise<Page<ReferenceResponse>> => {
  const response = await fetchServer<void, Page<ReferenceResponse>>(
    `${REFERENCES_BASE_URL}?page=${page}&size=${size}`
  );
  return response;
};

export const getReferenceById = async (
  id: number
): Promise<ReferenceResponse> => {
  const response = await fetchServer<void, ReferenceResponse>(
    `${REFERENCES_BASE_URL}/${id}`
  );
  return response;
};
