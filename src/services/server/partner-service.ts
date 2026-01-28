import {  PartnerResponse } from "@/types/partner.types";
import { Page } from "@/types/pagination.types";
import { fetchServer } from "@/utils/fetch-server";

const PARTNER_BASE_URL = "/api/v1/partners";

export const getPartners = async (page: number, size: number): Promise<Page<PartnerResponse>> => {
    const response = await fetchServer<void, Page<PartnerResponse>>(`${PARTNER_BASE_URL}?page=${page}&size=${size}`);
    return response;
}

export const getPartnerById = async (id: number): Promise<PartnerResponse> => {
    const response = await fetchServer<void, PartnerResponse>(`${PARTNER_BASE_URL}/${id}`);
    return response;
}