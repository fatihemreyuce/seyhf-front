import { NextRequest } from "next/server";
import { env } from "@/lib/env";

const KNOWN_EXTENSIONS =
  /\.(pdf|docx?|xlsx?|pptx?|txt|zip|rar|png|jpe?g|gif|webp)$/i;

function getExtensionFromUrl(url: string): string {
  const segment = decodeURIComponent(url.split("/").pop()?.split("?")[0] || "");
  const match = segment.match(KNOWN_EXTENSIONS);
  return match ? match[1].toLowerCase() : "";
}

function hasKnownExtension(name: string): boolean {
  return KNOWN_EXTENSIONS.test(name);
}

function safeFilename(name: string): string {
  return (
    name.replace(/[^a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF._\s-]/g, "_").trim() ||
    "belge"
  );
}

/** Panel https://localhost:8080 kaydedebilir; backend sadece http sunuyorsa fetch için http kullan. */
function toFetchUrl(url: string, baseUrl: string): string {
  if (
    url.startsWith("https://localhost") ||
    url.startsWith("https://127.0.0.1")
  ) {
    return url.replace(/^https:\/\//, "http://");
  }
  if (url.startsWith("/")) {
    const base =
      baseUrl.startsWith("https://localhost") ||
      baseUrl.startsWith("https://127.0.0.1")
        ? baseUrl.replace(/^https:\/\//, "http://")
        : baseUrl;
    return `${base.replace(/\/$/, "")}${url}`;
  }
  return url;
}

export async function GET(request: NextRequest) {
  const urlParam = request.nextUrl.searchParams.get("url");
  const filenameParam = request.nextUrl.searchParams.get("filename");

  if (!urlParam) {
    return new Response("URL gerekli", { status: 400 });
  }

  const baseUrl = env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
  let targetUrl: string;

  if (urlParam.startsWith("http://") || urlParam.startsWith("https://")) {
    const baseNormalized = baseUrl.replace(/^https:\/\//, "http://");
    const paramNormalized = urlParam.replace(/^https:\/\//, "http://");
    if (!paramNormalized.startsWith(baseNormalized)) {
      return new Response("Geçersiz URL", { status: 400 });
    }
    targetUrl = urlParam;
  } else if (urlParam.startsWith("/")) {
    targetUrl = `${baseUrl}${urlParam}`;
  } else {
    return new Response("Geçersiz URL", { status: 400 });
  }

  const fetchUrl = toFetchUrl(targetUrl, baseUrl);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(fetchUrl, {
      method: "GET",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return new Response(
        `Dosya alınamadı (${res.status}). Backend yanıt veriyor ama dosya bulunamadı veya hata döndü.`,
        { status: res.status }
      );
    }

    const contentType =
      res.headers.get("content-type") || "application/octet-stream";
    const contentLength = res.headers.get("content-length");

    const urlFileName = decodeURIComponent(
      fetchUrl.split("/").pop()?.split("?")[0] || ""
    );
    const extFromUrl = getExtensionFromUrl(fetchUrl);

    let filename: string;
    if (filenameParam) {
      const baseName = safeFilename(filenameParam);
      if (hasKnownExtension(baseName)) {
        filename = baseName;
      } else if (extFromUrl) {
        filename = `${baseName}.${extFromUrl}`;
      } else {
        filename =
          urlFileName && hasKnownExtension(urlFileName)
            ? safeFilename(urlFileName)
            : baseName;
      }
    } else {
      filename =
        urlFileName && hasKnownExtension(urlFileName)
          ? safeFilename(urlFileName)
          : extFromUrl
          ? `belge.${extFromUrl}`
          : "belge";
    }

    const headers = new Headers();
    const safeFilenameHeader = filename.replace(/["\\]/g, "\\$&");
    headers.set(
      "Content-Disposition",
      `attachment; filename="${safeFilenameHeader}"; filename*=UTF-8''${encodeURIComponent(
        filename
      )}`
    );
    headers.set("Content-Type", contentType);
    if (contentLength) headers.set("Content-Length", contentLength);

    return new Response(res.body, { headers });
  } catch (err) {
    console.error("Download proxy error:", err);
    const isNetwork =
      err instanceof TypeError &&
      (err.message === "fetch failed" ||
        err.message?.includes("Failed to fetch"));
    const isAbort = err instanceof Error && err.name === "AbortError";
    let message = "İndirme hatası.";
    if (isAbort) {
      message =
        "İstek zaman aşımına uğradı. Backend (panel API) yanıt vermiyor. Sunucunun çalıştığından emin olun.";
    } else if (isNetwork) {
      message =
        "Backend'e (localhost:8080 veya .env'deki NEXT_PUBLIC_API_URL) ulaşılamadı. Panel API sunucusunun çalıştığından emin olun.";
    }
    return new Response(message, { status: 502 });
  }
}
