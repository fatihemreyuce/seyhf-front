import type {
  NotificationsSubscribersRequest,
  NotificationsSubscribersResponse,
} from "@/types/notifications.subscribers.types";
import { fetchClient } from "@/utils/fetch-client";

const NOTIFICATIONS_SUBSCRIBERS_BASE_URL = "/api/v1/notification-subscribers";

export const createNotificationsSubscriber = async (
  request: NotificationsSubscribersRequest
): Promise<NotificationsSubscribersResponse> => {
  const response = await fetchClient<
    NotificationsSubscribersRequest,
    NotificationsSubscribersResponse
  >(`${NOTIFICATIONS_SUBSCRIBERS_BASE_URL}`, {
    method: "POST",
    body: request,
  });
  return response;
};
