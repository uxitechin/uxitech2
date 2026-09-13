import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { seedProjects } from "@/lib/db/seedData";

export const metadata = {
  title: "Work & Case Studies — UXI TECH",
  description:
    "Real digital systems, web applications, and automation engines engineered for modern businesses.",
};

export default function WorkPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-6 mb-16 max-w-3xl">
        <Badge variant="blue">Selected Projects</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#171717] leading-[1.05]">
          PROOF, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C72B2] to-[#1D68BD]">
            NOT PROMISES.
          </span>
        </h1>
        <p className="text-base sm:text-lg text-[#6F6F6F] leading-relaxed">
          Explore how UXI engineers digital systems that move businesses forward. Authentic case studies featuring real architectures, performance outcomes, and design systems.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
        {seedProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group block p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FAFAF8] hover:bg-white border border-[#EAEAE7] hover:border-[#2C72B2]/40 shadow-uxi-sm hover:shadow-uxi-md transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3 sm:space-y-4">
              {/* Graphic Banner */}
              <div className="aspect-[16/10] rounded-xl sm:rounded-2xl bg-white border border-[#EAEAE7] flex flex-col items-center justify-center p-3 sm:p-6 relative overflow-hidden text-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#2C72B2]/15 to-[#1D68BD]/10 absolute -top-8 -right-8 sm:-top-10 sm:-right-10 blur-xl group-hover:scale-125 transition-transform duration-500" />
                <span className="text-sm sm:text-2xl font-black text-[#171717] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#2C72B2] group-hover:to-[#1D68BD] transition-all line-clamp-1">
                  {project.title}
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-[#8E8E8E] mt-0.5 sm:mt-1 truncate w-full">
                  {project.client}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1 sm:mb-1.5 gap-1">
                  <Badge variant="neutral" className="text-[9px] sm:text-xs px-1.5 py-0.5 sm:px-2.5 sm:py-1 truncate max-w-[85px] sm:max-w-none">
                    {project.category}
                  </Badge>
                  <span className="text-[10px] sm:text-xs font-mono text-[#8E8E8E]">
                    0{project.order}
                  </span>
                </div>
                <h3 className="text-sm sm:text-xl font-bold text-[#171717] group-hover:text-[#2C72B2] transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#6F6F6F] line-clamp-2 mt-1 sm:mt-2 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="pt-3 sm:pt-6 mt-3 sm:mt-6 border-t border-[#EAEAE7] flex items-center justify-between text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#171717] group-hover:text-[#2C72B2]">
              <span>Case Study</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>

      {/* CTA Box */}
      <div className="mt-20 p-6 sm:p-12 rounded-3xl bg-[#EBF3FA] border border-[#D5E7F7] text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
          Ready to engineer your next digital product?
        </h2>
        <p className="text-sm text-[#6F6F6F] max-w-md mx-auto">
          We collaborate with discerning founders and established enterprises to build market-leading platforms.
        </p>
        <div className="pt-2">
          <Button href="/contact" variant="primary" size="md" className="w-full sm:w-auto justify-center">
            START A PROJECT
          </Button>
        </div>
      </div>
    </div>
  );
}
