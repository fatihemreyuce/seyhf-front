import { notFound } from "next/navigation";
import { BlogDetailHero } from "@/components/sections/blog-detail-hero";
import { BlogDetailContent } from "@/components/sections/blog-detail-content";
import { BlogDetailSidebar } from "@/components/sections/blog-detail-sidebar";
import { fetchCircularById, fetchCirculars } from "@/lib/api";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  if (Number.isNaN(numericId) || numericId < 1) {
    notFound();
  }

  const [circular, allCirculars] = await Promise.all([
    fetchCircularById(numericId),
    fetchCirculars(),
  ]);

  if (!circular) {
    notFound();
  }

  // Filter out current blog and limit to 10 items
  const relatedBlogs = allCirculars
    .filter((blog) => blog.id !== numericId)
    .slice(0, 10);

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <BlogDetailHero title={circular.title} basePath="" />

      <section className="bg-[#f8f9fa]">
        <div className="content-container py-12 md:py-16">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Main Content */}
            <article className="min-w-0 flex-1">
              <BlogDetailContent blog={circular} />
            </article>

            {/* Sidebar */}
            <aside className="w-full shrink-0 lg:w-80 xl:w-96">
              <BlogDetailSidebar blogs={relatedBlogs} basePath="" />
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
