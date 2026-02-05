import { PanelAnalyticsLive } from "@/components/panel/panel-analytics-live";

export default function PanelPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="content-container py-10 md:py-14">
        <h1 className="mb-8 text-2xl font-bold text-text-primary md:text-3xl">
          Panel – Canlı Analitik
        </h1>
        <PanelAnalyticsLive />
      </div>
    </main>
  );
}
