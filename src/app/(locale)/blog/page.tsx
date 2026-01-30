import { BlogPageContent } from "@/components/sections/blog-page-content";
import { BlogPageHero } from "@/components/sections/blog-page-hero";
import { type BlogPagePost } from "@/components/sections/blog-page-grid";
import { fetchCirculars } from "@/lib/api";

export default async function BlogPage() {
  const circulars = await fetchCirculars();

  const posts: BlogPagePost[] =
    circulars.length > 0
      ? circulars.map((c) => ({
          id: c.id,
          title: c.title,
          description: c.description,
          fileUrl: c.fileUrl,
          href: `/blog/${c.id}`,
        }))
      : (Array.from({ length: 6 }, (_, i) => ({
          id: i + 1,
          title: "Standard Size Of Business Agency Consulating Management.",
          description:
            "Lorem Ipsum is simply Dummy Text Of The Printing And Wasfsa Typesetting industry Lorem Ipsum The Industry's.",
          fileUrl: undefined as string | undefined,
          href: `/blog/${i + 1}`,
        })) as BlogPagePost[]);

  return (
    <main className="min-h-screen bg-[#8d929b]">
      <BlogPageHero />
      <BlogPageContent posts={posts} />
    </main>
  );
}
