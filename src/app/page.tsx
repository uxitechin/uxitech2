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
import { connectToDatabase } from "@/lib/db/mongodb";
import Project from "@/lib/db/models/Project";
import Testimonial from "@/lib/db/models/Testimonial";
import { seedProjects, seedTestimonials } from "@/lib/db/seedData";

export const dynamic = "force-dynamic";

async function getHomeData() {
  let projects = seedProjects;
  let testimonials = seedTestimonials;

  try {
    await connectToDatabase();
    const dbProjects = await Project.find({ published: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    if (dbProjects && dbProjects.length > 0) {
      projects = JSON.parse(JSON.stringify(dbProjects));
    }

    const dbTestimonials = await Testimonial.find({ published: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    if (dbTestimonials && dbTestimonials.length > 0) {
      testimonials = JSON.parse(JSON.stringify(dbTestimonials));
    }
  } catch (err) {
    console.warn("Falling back to seed homepage data:", err);
  }

  return { projects, testimonials };
}

export default async function Home() {
  const { projects, testimonials } = await getHomeData();

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
      <WorkPreviewSection projects={projects} />
      <WhyUxiSection />
      <ProcessSection />
      <FounderSection />
      <TestimonialsSection testimonials={testimonials} />
      <FinalCtaSection />
    </div>
  );
}
