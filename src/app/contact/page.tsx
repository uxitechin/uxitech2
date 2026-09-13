import React, { Suspense } from "react";
import Badge from "@/components/ui/Badge";
import ProjectIntakeWizard from "@/components/contact/ProjectIntakeWizard";
import { Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Start a Project — UXI TECH",
  description:
    "Initiate your digital system with UXI. Multi-step intake for web apps, AI automation, CRM, and branding.",
};

function ContactFormWrapper({
  searchParams,
}: {
  searchParams: { service?: string };
}) {
  return <ProjectIntakeWizard initialService={searchParams?.service} />;
}

export default function ContactPage({
  searchParams,
}: {
  searchParams: { service?: string };
}) {
  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Badge variant="blue">Project Initiation</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#171717] leading-[1.05]">
          LET&apos;S MAKE IT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C72B2] to-[#1D68BD]">
            REAL.
          </span>
        </h1>
        <p className="text-base sm:text-lg text-[#6F6F6F]">
          Tell us about your product or business requirements through our 6-step project wizard. We analyze your scope and respond with a structured technical roadmap.
        </p>
      </div>

      {/* The Intake Wizard */}
      <Suspense fallback={<div className="text-center p-12 text-sm text-[#6F6F6F]">Loading intake wizard...</div>}>
        <ContactFormWrapper searchParams={searchParams} />
      </Suspense>

      {/* Alternative Contact Direct Channels */}
      <div className="pt-12 border-t border-[#EAEAE7] grid grid-cols-1 sm:grid-cols-2 gap-6 text-center sm:text-left max-w-2xl mx-auto">
        <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#EAEAE7] flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#EAEAE7] flex items-center justify-center text-[#2C72B2] shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-[#8E8E8E] block">
              Direct Mail
            </span>
            <a
              href="mailto:contact@uxitech.in"
              className="text-sm font-bold text-[#171717] hover:text-[#2C72B2] transition-colors"
            >
              contact@uxitech.in
            </a>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#EAEAE7] flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#EAEAE7] flex items-center justify-center text-[#2C72B2] shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-[#8E8E8E] block">
              Location
            </span>
            <p className="text-sm font-bold text-[#171717]">
              Bengaluru · Global Remote
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
