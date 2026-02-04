"use client";

import { useState } from "react";
import { FileText, Download, Loader2 } from "lucide-react";

interface DocumentDownloadButtonProps {
  href: string;
  fileName: string;
  className?: string;
}

export function DocumentDownloadButton({
  href,
  fileName,
  className,
}: DocumentDownloadButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    if (loading || href === "#") return;
    setLoading(true);
    try {
      const res = await fetch(href);
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        const msg =
          text && text.length < 200 ? text : `İstek başarısız (${res.status})`;
        throw new Error(msg);
      }
      const blob = await res.blob();
      const disposition = res.headers.get("Content-Disposition") || "";
      let saveName = fileName;
      const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/i);
      if (utf8Match) {
        try {
          saveName = decodeURIComponent(utf8Match[1].trim());
        } catch {
          const fallback = disposition.match(/filename="?([^";]+)"?/i);
          if (fallback) saveName = fallback[1].replace(/^"|"$/g, "").trim();
        }
      } else {
        const fallback = disposition.match(/filename="?([^";]+)"?/i);
        if (fallback) saveName = fallback[1].replace(/^"|"$/g, "").trim();
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = saveName || "belge";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      const message =
        err instanceof Error
          ? err.message || "İndirme başarısız."
          : "İndirme başarısız.";
      alert(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading || href === "#"}
      className={className}
      aria-label={`${fileName} indir`}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition-colors duration-300 group-hover:bg-(--brand-red)/10 group-hover:text-(--brand-red)">
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
        ) : (
          <FileText className="h-6 w-6" aria-hidden />
        )}
      </div>
      <div className="min-w-0 flex-1 text-left">
        <p className="truncate font-semibold text-text-primary">{fileName}</p>
        <p className="mt-0.5 flex items-center gap-1 text-sm text-(--brand-red)">
          <Download className="h-4 w-4 shrink-0" aria-hidden />
          {loading ? "İndiriliyor…" : "İndir"}
        </p>
      </div>
    </button>
  );
}
