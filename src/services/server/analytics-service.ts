import type {
  TrackRequest,
  TrackResponse,
  ActiveResponse,
} from "@/types/analytics.types";
import { fetchServer } from "@/utils/fetch-server";
import { Page } from "@/types/pagination.types";

const ANALYTICS_BASE_URL = "/api/v1/analytics";

export async function track(
  request: TrackRequest,
  visitorId: string,
  sessionId: string
): Promise<TrackResponse> {
  const response = await fetchServer<TrackRequest, TrackResponse>(
    `${ANALYTICS_BASE_URL}/track?visitor_id=${visitorId}&session_id=${sessionId}`,
    {
      method: "POST",
      body: request,
    }
  );
  return response;
}

export async function getActive(): Promise<Page<ActiveResponse>> {
  const response = await fetchServer<void, Page<ActiveResponse>>(
    `${ANALYTICS_BASE_URL}/active`
  );
  return response;
}
