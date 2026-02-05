/**
 * Client-only: visitor and session IDs for analytics.
 * Use in browser (e.g. AnalyticsTracker) via getOrCreateVisitorId / getOrCreateSessionId.
 */

const VISITOR_ID_KEY = "visitor_id";
const SESSION_ID_KEY = "session_id";
const SESSION_TS_KEY = "session_ts";
const COOKIE_MAX_AGE_VISITOR = 365 * 24 * 60 * 60; // 1 year
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 min
const COOKIE_TTL_SESSION = Math.floor(SESSION_TTL_MS / 1000);

function randomId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, maxAgeSeconds: number): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

export function getOrCreateVisitorId(): string {
  let id = getCookie(VISITOR_ID_KEY);
  if (!id) {
    id = randomId();
    setCookie(VISITOR_ID_KEY, id, COOKIE_MAX_AGE_VISITOR);
  }
  return id;
}

export function getOrCreateSessionId(): string {
  const now = Date.now();
  const ts = getCookie(SESSION_TS_KEY);
  const id = getCookie(SESSION_ID_KEY);
  if (!id || !ts) {
    const newId = randomId();
    setCookie(SESSION_ID_KEY, newId, COOKIE_TTL_SESSION);
    setCookie(SESSION_TS_KEY, String(now), COOKIE_TTL_SESSION);
    return newId;
  }
  const age = now - parseInt(ts, 10);
  if (age >= SESSION_TTL_MS) {
    const newId = randomId();
    setCookie(SESSION_ID_KEY, newId, COOKIE_TTL_SESSION);
    setCookie(SESSION_TS_KEY, String(now), COOKIE_TTL_SESSION);
    return newId;
  }
  return id;
}
