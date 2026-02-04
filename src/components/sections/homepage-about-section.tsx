import { getHomepageAbout } from "@/services/server/homepage-about-service";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Target, Sparkles } from "lucide-react";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function HomepageAboutSection() {
  let data = null;
  try {
    const page = await getHomepageAbout(0, 1);
    data = page?.content?.[0] ?? null;
  } catch (error) {
    console.error("Homepage about fetch error:", error);
  }

  if (!data) {
    return null;
  }

  const hasLeft = !!(data.leftTitle || data.leftDescription);
  const hasRight = !!(data.rightTitle || data.rightDescription);
  if (!hasLeft && !hasRight) return null;

  return (
    <section
      className="relative overflow-hidden bg-linear-to-b from-gray-50 to-white py-16 md:py-20 lg:py-24"
      aria-labelledby="homepage-about-heading"
    >
      <div className="content-container">
        <AnimateOnScroll variant="from-top" className="mb-14 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-(--brand-red)/10">
            <Sparkles className="h-8 w-8 text-(--brand-red)" aria-hidden />
          </div>
          <p
            id="homepage-about-heading"
            className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--brand-red) md:text-sm"
          >
            Hakkımızda
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl md:text-4xl">
            Bizi <span className="text-(--brand-red)">Tanıyın</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-text-muted md:text-base">
            Misyonumuz ve vizyonumuzla sizleri tanıştırmak istiyoruz.
          </p>
        </AnimateOnScroll>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {hasLeft && (
            <AnimateOnScroll variant="from-bottom">
              <Card className="group relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-(--brand-red)/20 hover:shadow-xl">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 z-1 h-full w-0.5 origin-top scale-y-0 bg-(--brand-red) transition-transform duration-300 group-hover:scale-y-100"
                />
                <CardHeader className="pb-2 pt-6 sm:pt-8">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-(--brand-red)/20 bg-(--brand-red)/5 text-(--brand-red) transition-all duration-300 group-hover:bg-(--brand-red)/10 group-hover:border-(--brand-red)/30">
                    <Building2 className="h-7 w-7" aria-hidden />
                  </div>
                  <CardTitle className="text-xl font-bold text-text-primary sm:text-2xl">
                    {stripHtml(data.leftTitle || "Biz Kimiz")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                  <p className="text-base leading-relaxed text-text-muted">
                    {data.leftDescription
                      ? stripHtml(data.leftDescription)
                      : ""}
                  </p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          )}

          {hasRight && (
            <AnimateOnScroll
              variant="from-bottom"
              className={hasLeft ? "" : "lg:col-start-1"}
            >
              <Card className="group relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-(--brand-red)/20 hover:shadow-xl">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 z-1 h-full w-0.5 origin-top scale-y-0 bg-(--brand-red) transition-transform duration-300 group-hover:scale-y-100"
                />
                <CardHeader className="pb-2 pt-6 sm:pt-8">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-(--brand-red)/20 bg-(--brand-red)/5 text-(--brand-red) transition-all duration-300 group-hover:bg-(--brand-red)/10 group-hover:border-(--brand-red)/30">
                    <Target className="h-7 w-7" aria-hidden />
                  </div>
                  <CardTitle className="text-xl font-bold text-text-primary sm:text-2xl">
                    {stripHtml(data.rightTitle || "Vizyonumuz")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                  <p className="text-base leading-relaxed text-text-muted">
                    {data.rightDescription
                      ? stripHtml(data.rightDescription)
                      : ""}
                  </p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          )}
        </div>
      </div>
    </section>
  );
}
