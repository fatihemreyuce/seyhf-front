import {  SliderResponse } from "@/types/slider.types";
import { Page } from "@/types/pagination.types";
import { fetchServer } from "@/utils/fetch-server";

const SLIDER_BASE_URL = "/api/v1/sliders";

export const getSliders = async (page: number, size: number): Promise<Page<SliderResponse>> => {
    const response = await fetchServer<void, Page<SliderResponse>>(`${SLIDER_BASE_URL}?page=${page}&size=${size}`);
    return response;
}