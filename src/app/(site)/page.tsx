import { AboutSection } from "@/components/sections/AboutSection";
import { ContactForm } from "@/components/sections/ContactForm";
import { FactStrip } from "@/components/sections/FactStrip";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorksSection } from "@/components/sections/WorksSection";
import {
  BRAND,
  EMAIL,
  PHONE_TEL,
  SITE_URL,
  SPECIALIST,
  TELEGRAM_URL,
} from "@/content/site";

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SPECIALIST,
    brand: {
      "@type": "Brand",
      name: BRAND,
    },
    url: SITE_URL,
    email: EMAIL,
    telephone: PHONE_TEL,
    areaServed: "Belarus",
    sameAs: [TELEGRAM_URL],
    jobTitle: "Веб-разработчик",
    description:
      "Лендинги, многостраничные сайты и редизайн для бизнеса в Беларуси.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <HeroSection />
      <FactStrip />
      <WorksSection />
      <ServicesSection />
      <AboutSection />
      <ProcessSection />
      <ContactForm />
      <FaqSection />
    </>
  );
}
