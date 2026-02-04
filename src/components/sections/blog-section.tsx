import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { BlogGrid } from "./blog-grid";
import { fetchCirculars } from "@/lib/api";
import { Plus } from "lucide-react";

/** News & Blogs: ana sayfa "En Son Haberler & Makaleler" bölümü — modern, kullanıcı dostu UI. */
export async function BlogSection() {
  const circulars = await fetchCirculars();
  const posts =
    circulars.length > 0
      ? circulars.slice(0, 9).map((c) => ({
          id: c.id,
          title: c.title,
          description: c.description,
          fileUrl: c.fileUrl,
          href: `/blog/${c.id}`,
        }))
      : [
          {
            id: 1,
            title: "Standard Size Of Business Agency Consulating Management.",
            href: "/blog/1",
            description: undefined,
            fileUrl: undefined,
          },
          {
            id: 2,
            title: "Standard Size Of Business Agency Consulating Management.",
            href: "/blog/2",
            description: undefined,
            fileUrl: undefined,
          },
          {
            id: 3,
            title: "Standard Size Of Business Agency Consulating Management.",
            href: "/blog/3",
            description: undefined,
            fileUrl: undefined,
          },
        ];

  return (
    <section
      className="relative overflow-hidden bg-background-secondary"
      aria-labelledby="blog-section-heading"
    >
      {/* Dekoratif arka plan — hafif grid veya gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden
        style={{
          backgroundImage: `linear-gradient(to right, var(--foreground) 1px, transparent 1px),
            linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="content-container relative py-16 md:py-20 lg:py-24">
        {/* Başlık alanı */}
        <AnimateOnScroll
          variant="from-top"
          className="mb-12 md:mb-14 text-center"
        >
          <p
            id="blog-section-heading"
            className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-red md:text-sm"
          >
            Haberler &amp; Blog
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-tight">
            En Son <span className="text-brand-red">Haberler</span> &amp;
            Makaleler
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-text-muted md:text-base">
            Güncel duyurular ve sektör makaleleriyle sizleyiz.
          </p>
        </AnimateOnScroll>

        <BlogGrid posts={posts} />

        <AnimateOnScroll
          variant="from-bottom"
          className="mt-14 flex justify-center md:mt-16"
        >
          <Link
            href="/blog"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg px-8 py-4 text-base font-bold text-white shadow-lg transition-colors duration-300 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-(--brand-red) focus:ring-offset-2 md:px-10 md:py-4 md:text-lg"
            style={{ backgroundColor: "var(--brand-red)" }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Tüm Blogları Görüntüle
              <Plus
                className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:rotate-90"
                aria-hidden
              />
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-1/2 w-full -translate-x-1/2 origin-center scale-x-0 bg-black transition-transform duration-350 ease-out group-hover:scale-x-100"
            />
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
