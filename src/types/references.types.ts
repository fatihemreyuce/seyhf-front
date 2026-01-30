export interface ReferenceRequest {
  logo?: File | string;
  name: string;
  description: string;
  websiteUrl: string;
  orderIndex: number;
}

export interface ReferenceResponse {
  id: number;
  logoUrl: string | null;
  name: string;
  description: string;
  websiteUrl: string;
  orderIndex: number;
}
