export interface TrackRequest {
  pagePath: string;
  pageTitle: string;
  referrer: string;
}

export interface TrackResponse {
  visitorId: string;
  sessionId: string;
  tracked: boolean;
}

export interface ActiveResponse {
  count: number;
  timestamp: string;
}
