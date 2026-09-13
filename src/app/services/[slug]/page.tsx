import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { seedServices } from "@/lib/db/seedData";

export async function generateStaticParams() {
  return seedServices.map((s) => ({ slug: s.slug }));
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = seedServices.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <article className="pt-28 sm:pt-32 pb-20 sm:pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#6F6F6F] hover:text-[#171717] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all services</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-6 pb-12 border-b border-[#EAEAE7]">
        <Badge variant="blue">{service.category}</Badge>

        <h1 className="text-3xl sm:text-6xl font-black tracking-tight text-[#171717] break-words">
          {service.title}
        </h1>

        <p className="text-lg sm:text-2xl font-tech font-semibold text-[#1D68BD] tracking-tight leading-relaxed">
          &ldquo;{service.tagline}&rdquo;
        </p>

        <p className="text-base sm:text-lg text-[#6F6F6F] leading-relaxed max-w-3xl">
          {service.description}
        </p>

        <div className="pt-4">
          <Button
            href={`/contact?service=${encodeURIComponent(service.title)}`}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto justify-center"
          >
            START A {service.category} PROJECT
          </Button>
        </div>
      </div>

      {/* Core Breakdown Grid */}
      <div className="py-16 space-y-16">
        {/* Solves vs Builds */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-[#FAFAF8] border border-[#EAEAE7] space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1D68BD] font-bold">
              The Pain Point Solved
            </span>
            <h3 className="text-xl font-bold text-[#171717]">
              What This Eliminates
            </h3>
            <p className="text-sm text-[#6F6F6F] leading-relaxed">
              {service.whatItSolves}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#EBF3FA] border border-[#D5E7F7] space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2C72B2] font-bold">
              The Concrete Solution
            </span>
            <h3 className="text-xl font-bold text-[#171717]">
              What UXI Builds
            </h3>
            <p className="text-sm text-[#171717] leading-relaxed font-medium">
              {service.whatUxiBuilds}
            </p>
          </div>
        </section>

        {/* Full Capabilities */}
        <section className="space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8E8E8E] font-bold">
            Capabilities Matrix
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
            What We Deliver Under This Practice
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.capabilities.map((cap) => (
              <div
                key={cap}
                className="p-4 rounded-2xl bg-white border border-[#EAEAE7] flex items-center gap-3 shadow-uxi-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-[#2C72B2] shrink-0" />
                <span className="text-sm font-semibold text-[#171717]">
                  {cap}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Process Steps */}
        <section className="space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8E8E8E] font-bold">
            Systematic Methodology
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
            How We Execute This Service
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.process.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#EAEAE7] space-y-2 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#2C72B2] block mb-2">
                    Phase {step.step}
                  </span>
                  <h4 className="text-base font-bold text-[#171717]">
                    {step.title}
                  </h4>
                </div>
                <p className="text-xs text-[#6F6F6F] leading-relaxed pt-3 border-t border-[#EAEAE7]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="p-8 rounded-3xl bg-white border border-[#EAEAE7] space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8E8E8E] font-bold">
            Technologies & Frameworks
          </span>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((t) => (
              <span
                key={t}
                className="px-3.5 py-1.5 rounded-xl bg-[#FAFAF8] text-xs font-mono font-semibold text-[#171717] border border-[#EAEAE7]"
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* CTA Footer */}
      <div className="p-6 sm:p-12 rounded-3xl bg-[#EBF3FA] border border-[#D5E7F7] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#171717]">
            Build this with UXI
          </h3>
          <p className="text-xs sm:text-sm text-[#6F6F6F] mt-1">
            Let&apos;s map out your requirements and technical roadmap.
          </p>
        </div>

        <Button
          href={`/contact?service=${encodeURIComponent(service.title)}`}
          variant="primary"
          size="md"
          className="w-full sm:w-auto justify-center"
        >
          INITIATE INQUIRY
        </Button>
      </div>
    </article>
  );
}
