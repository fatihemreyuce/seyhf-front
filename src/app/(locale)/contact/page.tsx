import { ContactPageHero } from "@/components/sections/contact-page-hero";
import { ContactPageContent } from "@/components/sections/contact-page-content";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <ContactPageHero />
      <ContactPageContent />
    </main>
  );
}
