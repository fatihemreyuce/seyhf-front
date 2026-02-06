import { BlogPageContent } from "@/components/sections/blog-page-content";
import { BlogPageHero } from "@/components/sections/blog-page-hero";
import { type BlogPagePost } from "@/components/sections/blog-page-grid";
import { fetchCirculars } from "@/lib/api";

export default async function BlogPage() {
  const circulars = await fetchCirculars();

  const posts: BlogPagePost[] = circulars.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    fileUrl: c.fileUrl,
    href: `/blog/${c.id}`,
  }));

  return (
    <main className="min-h-screen bg-white">
      <BlogPageHero />
      <BlogPageContent posts={posts} />
    </main>
  );
}
