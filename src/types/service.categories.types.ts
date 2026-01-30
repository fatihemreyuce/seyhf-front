export interface ServiceCategoryRequest {
  name: string;
  description: string;
  orderIndex: number;
}

export interface ServiceCategoryResponse {
  id: string;
  name: string;
  description: string;
  orderIndex: number;
}
