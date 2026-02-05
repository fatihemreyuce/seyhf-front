export interface NotificationsSubscribersRequest {
  email: string;
  name: string;
  surname: string;
  companyName: string;
  title: string;
}

export interface NotificationsSubscribersResponse {
  id: number;
  email: string;
  name: string;
  surname: string;
  companyName: string;
  title: string;
}
