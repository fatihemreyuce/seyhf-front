export interface Documents {
  id: number;
  asset: File | string;
  name: string;
}

export interface qualityPolitics {
  text: string;
  orderNumber: number;
}

export interface officialPageRequest {
  description: string;
  qualityPolitics: qualityPolitics[];
}

export interface officialPageResponse {
  id: number;
  description: string;
  documents: Documents[];
  qualityPolitics: qualityPolitics[];
}
