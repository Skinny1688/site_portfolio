import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { QuizSection } from "@/components/sections/QuizSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorksSection } from "@/components/sections/WorksSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WorksSection />
      <ProcessSection />
      <ReviewsSection />
      <QuizSection />
    </>
  );
}
