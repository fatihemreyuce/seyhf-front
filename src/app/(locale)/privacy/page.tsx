import { getSettings } from "@/services/server/settings-service";
import { PolicyPageHero } from "@/components/sections/policy-page-hero";
import { Card, CardContent } from "@/components/ui/card";

function isUrl(str: string): boolean {
  const s = str?.trim() ?? "";
  return s.startsWith("http://") || s.startsWith("https://");
}

function isHtml(str: string): boolean {
  return /<[a-z][\s\S]*>/i.test(str?.trim() ?? "");
}

export default async function PrivacyPage() {
  let content: string | null = null;
  try {
    const page = await getSettings("", 0, 1, "id,asc");
    const settings = page?.content?.[0];
    if (settings) {
      if (settings.privacyText?.trim()) content = settings.privacyText.trim();
      else if (settings.privacyPolicy?.trim() && !isUrl(settings.privacyPolicy))
        content = settings.privacyPolicy.trim();
    }
  } catch (e) {
    console.error("Privacy settings fetch error:", e);
  }

  return (
    <main className="min-h-screen bg-white">
      <PolicyPageHero title="Gizlilik Politikası" variant="privacy" />

      <div className="content-container py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <Card className="overflow-hidden border-gray-200/80 bg-white shadow-sm">
            <CardContent className="p-6 sm:p-8 md:p-10">
              {content ? (
                isHtml(content) ? (
                  <div
                    className="policy-content prose prose-gray max-w-none prose-p:text-text-muted prose-p:leading-relaxed prose-headings:text-text-primary prose-headings:font-bold prose-ul:my-4 prose-li:text-text-muted"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                ) : (
                  <div className="whitespace-pre-line text-base leading-relaxed text-text-muted">
                    {content}
                  </div>
                )
              ) : (
                <p className="text-center text-text-muted">
                  Gizlilik politikası metni henüz eklenmemiş veya yüklenemedi.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
