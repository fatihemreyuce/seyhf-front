export interface FaqsRequest {
  question: string;
  answer: string;
  orderIndex: number;
}

export interface FaqsResponse {
  id: number;
  question: string;
  answer: string;
  orderIndex: number;
}
