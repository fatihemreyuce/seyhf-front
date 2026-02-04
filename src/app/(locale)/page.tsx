import { SliderSection } from "@/components/sections/slider-section";
import { HomepageAboutSection } from "@/components/sections/homepage-about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { BlogSection } from "@/components/sections/blog-section";
import { UsefulInformationSection } from "@/components/sections/useful-information-section";
import { ReferencesSection } from "@/components/sections/references-section";

export default function Home() {
  return (
    <main>
      <SliderSection />
      <HomepageAboutSection />
      <ServicesSection />
      <PartnersSection />
      <BlogSection />
      <UsefulInformationSection />
      <ReferencesSection />
    </main>
  );
}
