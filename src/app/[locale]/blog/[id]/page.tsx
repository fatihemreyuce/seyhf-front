import { notFound } from "next/navigation";
import { BlogDetailHero } from "@/components/sections/blog-detail-hero";
import { BlogDetailSearch } from "@/components/sections/blog-detail-search";
import { fetchCircularById } from "@/lib/api";
import { FileDown } from "lucide-react";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id, locale } = await params;
  const basePath = `/${locale}`;
  const numericId = Number(id);
  if (Number.isNaN(numericId) || numericId < 1) {
    notFound();
  }

  const circular = await fetchCircularById(numericId);
  if (!circular) {
    notFound();
  }

  const plainDescription = stripHtml(circular.description ?? "");

  return (
    <main className="min-h-screen bg-[#8d929b]">
      <BlogDetailHero title={circular.title} basePath={basePath} />

      <section className="bg-white">
        <div className="content-container py-10 md:py-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
            <article className="min-w-0 flex-1">
              {circular.fileUrl && (
                <a
                  href={circular.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mb-10 flex items-start gap-5 rounded-2xl border border-gray-100 bg-linear-to-br from-gray-50 to-white p-6 shadow-sm transition-all duration-300 hover:border-(--brand-red)/20 hover:shadow-md hover:shadow-(--brand-red)/5"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition-colors group-hover:bg-(--brand-red) group-hover:text-white">
                    <FileDown
                      className="h-7 w-7 text-[#4C505A] transition-colors group-hover:text-white"
                      aria-hidden
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block text-base font-semibold text-[#282A2E] transition-colors group-hover:text-(--brand-red)">
                      Dosyayı indir / aç
                    </span>
                    <p className="mt-0.5 text-sm text-[#666]">
                      PDF veya ek dosya
                    </p>
                  </div>
                </a>
              )}
              {plainDescription && (
                <div className="prose prose-lg max-w-none text-[#333] prose-p:leading-[1.8] prose-p:text-[#444]">
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {plainDescription}
                  </div>
                </div>
              )}
              {!plainDescription && !circular.fileUrl && (
                <p className="text-[#666]">Bu içerik için metin bulunmuyor.</p>
              )}
            </article>
            <aside className="w-full shrink-0 lg:w-80">
              <BlogDetailSearch basePath={basePath} />
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
