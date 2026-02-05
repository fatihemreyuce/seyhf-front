import type { TrackRequest, TrackResponse } from "@/types/analytics.types";
import { fetchClient } from "@/utils/fetch-client";

const ANALYTICS_BASE_URL = "/api/v1/analytics";

export async function trackPageView(
  request: TrackRequest,
  visitorId: string,
  sessionId: string
): Promise<TrackResponse> {
  const params = new URLSearchParams({
    visitor_id: visitorId,
    session_id: sessionId,
  });
  const response = await fetchClient<TrackRequest, TrackResponse>(
    `${ANALYTICS_BASE_URL}/track?${params.toString()}`,
    {
      method: "POST",
      body: request,
    }
  );
  return response;
}
