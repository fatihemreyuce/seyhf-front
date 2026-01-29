import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { BlogGrid } from "./blog-grid";
import { fetchCirculars } from "@/lib/api";

/** News & Blogs: "LATEST [NEWS] & ARTICLES", 3 kart, View All Blogs +. Panel (circulars) verisinden. */
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
    <section className="relative bg-white">
      <div className="content-container relative py-10 md:py-14">
        <AnimateOnScroll variant="from-top" className="mb-10 text-center">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-gray-500 md:text-sm">
            News &amp; Blogs
          </p>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-[#282A2E] md:text-3xl lg:text-4xl">
            LATEST <span className="text-[#ED3237]">[</span>
            <span className="text-[#ED3237]">NEWS</span>
            <span className="text-[#ED3237]">]</span> &amp; ARTICLES
          </h2>
        </AnimateOnScroll>

        <BlogGrid posts={posts} />

        <AnimateOnScroll
          variant="from-bottom"
          className="mt-12 flex justify-center"
        >
          <Link
            href="/blog"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-[#ED3237] px-6 py-3 text-xs font-bold text-white transition-colors xl:px-10 xl:py-5 xl:text-base"
          >
            <span className="relative z-10">
              View All Blogs <span className="ml-1">+</span>
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-1/2 w-full -translate-x-1/2 bg-black origin-center scale-x-0 transition-transform duration-350 ease-out group-hover:scale-x-100"
            />
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
