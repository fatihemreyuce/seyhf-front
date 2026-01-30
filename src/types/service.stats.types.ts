export interface ServiceStatsRequest {
  icon?: File | string;
  numberValue: number;
  title: string;
}

export interface ServiceStatsResponse {
  id: number;
  iconUrl?: string;
  numberValue: number;
  title: string;
}
