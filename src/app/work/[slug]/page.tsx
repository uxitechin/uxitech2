import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { seedProjects } from "@/lib/db/seedData";

export async function generateStaticParams() {
  return seedProjects.map((p) => ({ slug: p.slug }));
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const projectIndex = seedProjects.findIndex((p) => p.slug === params.slug);
  const project = seedProjects[projectIndex];

  if (!project) {
    notFound();
  }

  const nextProject =
    seedProjects[(projectIndex + 1) % seedProjects.length];

  return (
    <article className="pt-28 sm:pt-32 pb-20 sm:pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#6F6F6F] hover:text-[#171717] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all projects</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-6 pb-12 border-b border-[#EAEAE7]">
        <div className="flex items-center gap-3">
          <Badge variant="blue">{project.category}</Badge>
          <span className="text-xs font-mono text-[#8E8E8E]">
            Client: {project.client}
          </span>
        </div>

        <h1 className="text-3xl sm:text-6xl font-black tracking-tight text-[#171717] break-words">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl text-[#6F6F6F] leading-relaxed max-w-3xl">
          {project.description}
        </p>

        {/* Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#EAEAE7]">
          <div>
            <span className="text-[11px] font-mono uppercase text-[#8E8E8E] block">
              Client
            </span>
            <p className="text-sm font-bold text-[#171717] mt-0.5">
              {project.client}
            </p>
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase text-[#8E8E8E] block">
              Project Type
            </span>
            <p className="text-sm font-bold text-[#171717] mt-0.5">
              {project.category}
            </p>
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase text-[#8E8E8E] block">
              Services
            </span>
            <p className="text-xs font-semibold text-[#171717] mt-0.5">
              {project.services.join(", ")}
            </p>
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase text-[#8E8E8E] block">
              Technologies
            </span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {project.technologies.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="px-1.5 py-0.5 rounded bg-[#F5F5F3] text-[10px] font-mono text-[#171717]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Sections */}
      <div className="py-16 space-y-16">
        {/* 1. THE CHALLENGE */}
        <section className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#1D68BD] font-bold">
            01 / The Challenge
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
            Understanding the Friction Point
          </h2>
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAFAF8] border border-[#EAEAE7] text-sm sm:text-base text-[#6F6F6F] leading-relaxed">
            {project.challenge}
          </div>
        </section>

        {/* 2. THE IDEA & SOLUTION */}
        <section className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#2C72B2] font-bold">
            02 / The Idea
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
            Architectural Vision & Strategy
          </h2>
          <div className="p-6 sm:p-8 rounded-3xl bg-[#EBF3FA] border border-[#D5E7F7] text-sm sm:text-base text-[#171717] leading-relaxed font-medium">
            {project.solution}
          </div>
        </section>

        {/* 3. THE BUILD */}
        <section className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#6F6F6F] font-bold">
            03 / The Build
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
            Engineering & System Implementation
          </h2>
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAEAE7] shadow-uxi-sm space-y-4 text-sm sm:text-base text-[#6F6F6F] leading-relaxed">
            <p>{project.build}</p>

            <div className="pt-4 border-t border-[#EAEAE7]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#171717] font-bold block mb-2">
                Tech Stack Deployed:
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-xl bg-[#FAFAF8] text-xs font-mono text-[#171717] border border-[#EAEAE7]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. THE RESULT */}
        <section className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#2C72B2] font-bold">
            04 / The Result
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
            Measurable Operational Impact
          </h2>
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAFAF8] border border-[#EAEAE7] flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-[#2C72B2] shrink-0 mt-1" />
            <p className="text-base sm:text-lg font-semibold text-[#171717] leading-relaxed">
              {project.result}
            </p>
          </div>
        </section>
      </div>

      {/* Next Project Footer */}
      <div className="pt-12 border-t border-[#EAEAE7] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#8E8E8E]">
            Up Next
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#171717] mt-0.5">
            {nextProject.title}
          </h3>
          <p className="text-xs text-[#6F6F6F]">{nextProject.category}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <Link
            href={`/work/${nextProject.slug}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#171717] bg-[#EBF3FA] hover:bg-white border border-[#2C72B2]/40 transition-colors shadow-sm"
          >
            <span>NEXT PROJECT</span>
            <ArrowRight className="w-4 h-4 text-[#2C72B2]" />
          </Link>

          <Button href="/contact" variant="primary" size="md" className="w-full sm:w-auto justify-center">
            START A PROJECT
          </Button>
        </div>
      </div>
    </article>
  );
}
