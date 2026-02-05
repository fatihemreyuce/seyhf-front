"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, Clock, RefreshCw, Loader2 } from "lucide-react";
import type { Page } from "@/types/pagination.types";
import type { ActiveResponse } from "@/types/analytics.types";

const POLL_INTERVAL_MS = 5000;
const API_ACTIVE = "/api/analytics/active";

function formatTimestamp(ts: string): string {
  try {
    const d = new Date(ts);
    if (Number.isNaN(d.getTime())) return ts;
    return d.toLocaleString("tr-TR", {
      dateStyle: "short",
      timeStyle: "medium",
    });
  } catch {
    return ts;
  }
}

export function PanelAnalyticsLive() {
  const [data, setData] = useState<Page<ActiveResponse> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActive = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch(API_ACTIVE, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as Page<ActiveResponse>;
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Veri yüklenemedi");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActive();
    const id = setInterval(fetchActive, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchActive]);

  const latest = data?.content?.[0];
  const count = latest?.count ?? 0;
  const timestamp = latest?.timestamp ?? "";

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-gray-200/80 bg-white shadow-sm">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2 text-lg font-bold text-text-primary">
              <Activity className="h-5 w-5 text-(--brand-red)" aria-hidden />
              Canlı aktif ziyaretçi sayısı
            </CardTitle>
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                fetchActive();
              }}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-60"
              aria-label="Yenile"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <RefreshCw className="h-4 w-4" aria-hidden />
              )}
              Yenile
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {error && (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          {loading && !data && (
            <div className="flex items-center justify-center gap-2 py-12 text-gray-500">
              <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
              <span>Yükleniyor...</span>
            </div>
          )}
          {!loading && data && (
            <div className="flex flex-wrap items-stretch gap-6">
              <div className="flex min-w-[140px] flex-col rounded-xl border border-(--brand-red)/20 bg-(--brand-red)/5 p-5">
                <span className="flex items-center gap-2 text-sm font-medium text-text-muted">
                  <Users className="h-4 w-4 text-(--brand-red)" aria-hidden />
                  Aktif ziyaretçi
                </span>
                <span className="mt-2 text-3xl font-extrabold text-text-primary">
                  {count}
                </span>
              </div>
              <div className="flex min-w-[180px] flex-col rounded-xl border border-gray-200 bg-gray-50/50 p-5">
                <span className="flex items-center gap-2 text-sm font-medium text-text-muted">
                  <Clock className="h-4 w-4 text-(--brand-red)" aria-hidden />
                  Son güncelleme
                </span>
                <span className="mt-2 text-sm font-medium text-text-primary">
                  {timestamp ? formatTimestamp(timestamp) : "—"}
                </span>
              </div>
            </div>
          )}
          {data?.content && data.content.length > 1 && (
            <div className="mt-6 border-t border-gray-100 pt-4">
              <h3 className="mb-3 text-sm font-semibold text-text-primary">
                Geçmiş kayıtlar
              </h3>
              <ul className="space-y-2">
                {data.content.slice(1, 6).map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm"
                  >
                    <span className="font-medium text-text-primary">
                      {item.count} aktif
                    </span>
                    <span className="text-text-muted">
                      {formatTimestamp(item.timestamp)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
