export interface UsefulInformationRequest {
  file?: File | string;
  title: string;
  description: string;
  excerpt: string;
}

export interface UsefulInformationResponse {
  id: number;
  title: string;
  description: string;
  excerpt: string;
  fileUrl?: string;
}
