import React, { Suspense } from "react";
import Badge from "@/components/ui/Badge";
import ProjectIntakeWizard from "@/components/contact/ProjectIntakeWizard";
import { Mail, MapPin, Phone } from "lucide-react";

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
      <div className="pt-12 border-t border-[#EAEAE7] grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
        {/* Email */}
        <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#EAEAE7] flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#EAEAE7] flex items-center justify-center text-[#2C72B2] shrink-0 shadow-sm">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-[#8E8E8E] block">
                Official Mail
              </span>
              <h3 className="text-sm font-bold text-[#171717]">Inquiries & Proposals</h3>
            </div>
          </div>
          <div>
            <a
              href="mailto:uxitech.in@gmail.com"
              className="text-sm sm:text-base font-bold text-[#171717] hover:text-[#2C72B2] transition-colors break-all"
            >
              uxitech.in@gmail.com
            </a>
            <p className="text-xs text-[#6F6F6F] mt-1">Response within 24 hours</p>
          </div>
        </div>

        {/* Direct Call / Phone */}
        <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#EAEAE7] flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#EAEAE7] flex items-center justify-center text-[#2C72B2] shrink-0 shadow-sm">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-[#8E8E8E] block">
                Direct Line
              </span>
              <h3 className="text-sm font-bold text-[#171717]">Call & WhatsApp</h3>
            </div>
          </div>
          <div className="space-y-1">
            <div>
              <a
                href="tel:+919391781748"
                className="text-sm font-bold text-[#171717] hover:text-[#2C72B2] transition-colors block"
              >
                +91 93917 81748
              </a>
            </div>
            <div>
              <a
                href="tel:+919959593027"
                className="text-sm font-bold text-[#171717] hover:text-[#2C72B2] transition-colors block"
              >
                +91 99595 93027
              </a>
            </div>
            <div>
              <a
                href="tel:+917330820239"
                className="text-sm font-bold text-[#171717] hover:text-[#2C72B2] transition-colors block"
              >
                +91 73308 20239
              </a>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#EAEAE7] flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#EAEAE7] flex items-center justify-center text-[#2C72B2] shrink-0 shadow-sm">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-[#8E8E8E] block">
                Headquarters
              </span>
              <h3 className="text-sm font-bold text-[#171717]">Office Location</h3>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-[#171717] leading-snug">
              Vijayawada, Andhra Pradesh
            </p>
            <p className="text-xs font-mono text-[#6F6F6F] mt-1">
              PIN: 520013 · India
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
