import HeroSection from "@/components/home/HeroSection";
import StatementSection from "@/components/home/StatementSection";
import EcosystemSection from "@/components/home/EcosystemSection";
import ServicesSection from "@/components/home/ServicesSection";
import StorytellingSection from "@/components/home/StorytellingSection";
import AiAutomationSection from "@/components/home/AiAutomationSection";
import BrandingTransformation from "@/components/home/BrandingTransformation";
import GrowthSection from "@/components/home/GrowthSection";
import AcademicSection from "@/components/home/AcademicSection";
import WorkPreviewSection from "@/components/home/WorkPreviewSection";
import WhyUxiSection from "@/components/home/WhyUxiSection";
import ProcessSection from "@/components/home/ProcessSection";
import FounderSection from "@/components/home/FounderSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <StatementSection />
      <EcosystemSection />
      <ServicesSection />
      <StorytellingSection />
      <AiAutomationSection />
      <BrandingTransformation />
      <GrowthSection />
      <AcademicSection />
      <WorkPreviewSection />
      <WhyUxiSection />
      <ProcessSection />
      <FounderSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </div>
  );
}
