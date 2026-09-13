import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { connectToDatabase } from "@/lib/db/mongodb";
import Service from "@/lib/db/models/Service";
import { seedServices } from "@/lib/db/seedData";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Services & Capabilities — UXI TECH",
  description:
    "Explore UXI's 9 core capabilities across Build, Intelligence, Systems, Identity, Growth, and Technical Education.",
};

async function getServices() {
  try {
    await connectToDatabase();
    const services = await Service.find({ published: true }).sort({ order: 1 }).lean();
    if (services && services.length > 0) {
      return JSON.parse(JSON.stringify(services));
    }
  } catch (err) {
    console.warn("Falling back to seedServices:", err);
  }
  return seedServices;
}

export default async function ServicesPage() {
  const allServices = await getServices();

  const categories = [
    { name: "BUILD", desc: "Flagship Web & Mobile Engineering" },
    { name: "INTELLIGENCE", desc: "AI Automation & CRM Architecture" },
    { name: "SYSTEMS", desc: "Custom Operating Software & Back-Office ERP" },
    { name: "IDENTITY", desc: "Brand Systems & Typographic Authority" },
    { name: "GROWTH", desc: "Paid Acquisition & Technical SEO Dominance" },
    { name: "EDUCATION", desc: "Structured Academic Engineering & Research Prototypes" },
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-6 mb-16 sm:mb-20 max-w-3xl">
        <Badge variant="blue">Full Capability Spectrum</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#171717] leading-[1.05]">
          DIGITAL SYSTEMS. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C72B2] to-[#1D68BD]">
            END TO END.
          </span>
        </h1>
        <p className="text-base sm:text-lg text-[#6F6F6F] leading-relaxed">
          We combine world-class visual design, rigorous software engineering, autonomous AI workflows, and precision growth to move modern enterprises forward.
        </p>
      </div>

      {/* Grouped Services Categories */}
      <div className="space-y-16 sm:space-y-20">
        {categories.map((cat) => {
          const catServices = allServices.filter((s: any) => s.category === cat.name);
          if (catServices.length === 0) return null;

          return (
            <div key={cat.name} className="space-y-6 sm:space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 border-b border-[#EAEAE7] gap-2">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                    {cat.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6F6F6F] mt-1">{cat.desc}</p>
                </div>
                <span className="text-xs font-mono text-[#2C72B2] font-bold">
                  {catServices.length} {catServices.length === 1 ? "Offering" : "Offerings"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
                {catServices.map((service: any) => {
                  const isSingle = catServices.length === 1;

                  return (
                    <div
                      key={service.slug}
                      className={`p-3.5 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl bg-[#FAFAF8] border border-[#EAEAE7] hover:border-[#2C72B2]/40 shadow-uxi-sm hover:shadow-uxi-md transition-all duration-300 flex flex-col justify-between ${
                        isSingle ? "col-span-2 sm:col-span-1" : ""
                      }`}
                    >
                      <div className="space-y-3 sm:space-y-6">
                        <div className="flex items-center justify-between gap-1">
                          <Badge variant="neutral" className="text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1">
                            0{service.order || 1}
                          </Badge>
                          <Link
                            href={`/services/${service.slug}`}
                            className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#2C72B2] hover:underline inline-flex items-center gap-0.5 sm:gap-1"
                          >
                            <span className="hidden sm:inline">Deep Dive</span>
                            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </Link>
                        </div>

                        <div>
                          <h3 className="text-sm sm:text-xl lg:text-2xl font-bold text-[#171717] leading-snug">
                            {service.title}
                          </h3>
                          <p className="text-[11px] sm:text-xs font-tech font-semibold text-[#1D68BD] mt-1 line-clamp-1 sm:line-clamp-none tracking-tight">
                            {service.tagline}
                          </p>
                        </div>

                        <p className="text-[11px] sm:text-sm text-[#6F6F6F] leading-relaxed line-clamp-3 sm:line-clamp-none">
                          {service.description}
                        </p>

                        <div className="space-y-1.5 sm:space-y-2 pt-2 border-t border-[#EAEAE7]">
                          <span className="text-[9px] sm:text-[11px] font-mono uppercase text-[#6F6F6F] block font-bold">
                            Core Deliverables:
                          </span>
                          <div className="grid grid-cols-1 gap-1 sm:gap-1.5">
                            {service.capabilities?.slice(0, 3).map((cap: string) => (
                              <div
                                key={cap}
                                className="flex items-start gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-[#171717]"
                              >
                                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2C72B2] shrink-0 mt-0.5" />
                                <span className="line-clamp-1 sm:line-clamp-none">{cap}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 sm:pt-6 mt-3 sm:mt-6 border-t border-[#EAEAE7] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                        <div className="hidden sm:flex flex-wrap gap-1">
                          {service.technologies?.slice(0, 3).map((t: string) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded bg-white text-[10px] font-mono text-[#6F6F6F] border border-[#EAEAE7]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <Button
                          href={`/contact?service=${encodeURIComponent(service.title)}`}
                          variant="primary"
                          size="sm"
                          className="w-full sm:w-auto justify-center text-[10px] sm:text-xs py-1.5 sm:py-2 px-2.5 sm:px-4"
                        >
                          ENGAGE
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Global CTA */}
      <div className="mt-20 sm:mt-24 p-6 sm:p-14 rounded-3xl bg-[#EBF3FA] border border-[#D5E7F7] text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717]">
          Need a multi-disciplinary system?
        </h2>
        <p className="text-sm text-[#6F6F6F] max-w-xl mx-auto leading-relaxed">
          Most of our clients engage us across multiple connected disciplines—such as Web + CRM + AI Automation—to create an uninterrupted digital pipeline.
        </p>
        <div className="pt-2">
          <Button href="/contact" variant="primary" size="lg" className="w-full sm:w-auto justify-center">
            STRUCTURE YOUR PROJECT
          </Button>
        </div>
      </div>
    </div>
  );
}
