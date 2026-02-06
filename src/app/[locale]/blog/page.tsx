import { BlogPageContent } from "@/components/sections/blog-page-content";
import { BlogPageHero } from "@/components/sections/blog-page-hero";
import { type BlogPagePost } from "@/components/sections/blog-page-grid";
import { fetchCirculars } from "@/lib/api";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const basePath = `/${locale}`;
  const circulars = await fetchCirculars();

  const posts: BlogPagePost[] = circulars.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    fileUrl: c.fileUrl,
    href: `${basePath}/blog/${c.id}`,
  }));

  return (
    <main className="min-h-screen bg-white">
      <BlogPageHero basePath={basePath} />
      <BlogPageContent posts={posts} />
    </main>
  );
}
