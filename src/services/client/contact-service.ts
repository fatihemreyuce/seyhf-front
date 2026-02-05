import type { ContactRequest, ContactResponse } from "@/types/contact.types";
import { fetchClient } from "@/utils/fetch-client";

const CONTACT_BASE_URL = "/api/v1/contact";

export async function sendContact(
  visitorId: string,
  sessionId: string,
  request: ContactRequest
): Promise<ContactResponse> {
  const params = new URLSearchParams({
    visitor_id: visitorId,
    session_id: sessionId,
  });
  const response = await fetchClient<ContactRequest, ContactResponse>(
    `${CONTACT_BASE_URL}?${params.toString()}`,
    {
      method: "POST",
      body: request,
    }
  );
  return response;
}
