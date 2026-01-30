import { SliderSection } from "@/components/sections/slider-section";
import { ServicesSection } from "@/components/sections/services-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { BlogSection } from "@/components/sections/blog-section";

export default function Home() {
  return (
    <main>
      <SliderSection />
      <ServicesSection />
      <PartnersSection />
      <BlogSection />
    </main>
  );
}
