import { SliderSection } from "@/components/sections/slider-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { BlogSection } from "@/components/sections/blog-section";

export default function Home() {
  return (
    <main>
      <SliderSection />
      <PartnersSection />
      <BlogSection />
    </main>
  );
}
