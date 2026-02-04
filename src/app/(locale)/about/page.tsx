import { getOfficialPage } from "@/services/server/offical-page-service";
import { AboutPageHero } from "@/components/sections/about-page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import {
  FileText,
  Download,
  CheckCircle2,
  ListOrdered,
  Shield,
} from "lucide-react";
import type { officialPageResponse, Documents } from "@/types/official.page";
import { DocumentDownloadButton } from "@/components/document-download-button";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function documentDownloadUrl(doc: Documents): string {
  if (typeof doc.asset !== "string" || !doc.asset) return "#";
  const params = new URLSearchParams();
  params.set("url", doc.asset);
  if (doc.name) params.set("filename", doc.name);
  return `/api/download?${params.toString()}`;
}

/** Tüm içerik panelden (getOfficialPage) çekilir. Mock veri kullanılmaz. */
export default async function AboutPage() {
  let data: officialPageResponse | null = null;
  try {
    let page = await getOfficialPage(0, 10);
    data = page?.content?.[0] ?? null;
    if (!data && page?.content?.length === 0) {
      page = await getOfficialPage(1, 10);
      data = page?.content?.[0] ?? null;
    }
    // Veri yoksa sadece "İçerik yüklenemedi" mesajı gösterilir; mock gösterilmez
  } catch (error) {
    console.error("Official page fetch error:", error);
  }

  const hasDescription = !!data?.description?.trim();
  const qualityPolitics = (data?.qualityPolitics ?? [])
    .slice()
    .sort((a, b) => (a.orderNumber ?? 0) - (b.orderNumber ?? 0));
  const documents = data?.documents ?? [];

  return (
    <main>
      <AboutPageHero />

      <div className="content-container py-16 md:py-20 lg:py-24">
        {hasDescription && (
          <AnimateOnScroll variant="from-top" className="mb-16">
            <Card className="overflow-hidden border-gray-200/80 bg-white shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl font-bold text-text-primary sm:text-2xl">
                  <Shield className="h-6 w-6 text-(--brand-red)" aria-hidden />
                  Kurumsal Tanıtım
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line text-base leading-relaxed text-text-muted">
                  {stripHtml(data!.description)}
                </p>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        )}

        {qualityPolitics.length > 0 && (
          <AnimateOnScroll variant="from-bottom" className="mb-16">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-text-primary sm:text-2xl">
              <ListOrdered className="h-6 w-6 text-(--brand-red)" aria-hidden />
              Kalite Politikamız
            </h2>
            <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              {qualityPolitics.map((item, index) => (
                <li key={index}>
                  <Card className="group border-gray-200/80 bg-gray-50/50 transition-all duration-300 hover:border-(--brand-red)/20 hover:shadow-md">
                    <CardContent className="flex items-start gap-4 p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--brand-red)/10 text-(--brand-red) transition-colors duration-300 group-hover:bg-(--brand-red)/20">
                        <CheckCircle2 className="h-5 w-5" aria-hidden />
                      </div>
                      <p className="text-base leading-relaxed text-text-secondary">
                        {stripHtml(item.text)}
                      </p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </AnimateOnScroll>
        )}

        {documents.length > 0 && (
          <AnimateOnScroll variant="from-bottom">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-text-primary sm:text-2xl">
              <FileText className="h-6 w-6 text-(--brand-red)" aria-hidden />
              Belgeler
            </h2>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {documents.map((doc) => {
                const href = documentDownloadUrl(doc);
                const isLink = href !== "#";
                return (
                  <Card
                    key={doc.id}
                    className="group overflow-hidden border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:border-(--brand-red)/20 hover:shadow-lg"
                  >
                    <CardContent className="p-0">
                      {isLink ? (
                        <DocumentDownloadButton
                          href={href}
                          fileName={doc.name || "Belge"}
                          className="group flex w-full items-center gap-4 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-red) focus-visible:ring-inset"
                        />
                      ) : (
                        <div className="flex items-center gap-4 p-5">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
                            <FileText className="h-6 w-6" aria-hidden />
                          </div>
                          <p className="truncate font-semibold text-text-primary">
                            {doc.name || "Belge"}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </AnimateOnScroll>
        )}

        {!data && (
          <Card className="border-gray-200 bg-gray-50">
            <CardContent className="py-12 text-center">
              <p className="text-text-muted">
                İçerik yüklenemedi veya henüz eklenmemiş.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
