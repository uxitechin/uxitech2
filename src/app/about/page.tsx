import React from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "About — UXI TECH",
  description:
    "Learn about UXI TECH, founded by Pavan Vedesh. We combine design, engineering, and automation to build digital systems.",
};

export default function AboutPage() {
  const principles = [
    {
      title: "Digital Systems Over Fragile Sites",
      desc: "Websites must not exist as isolated brochures. They must be directly connected to lead capture, automated follow-up sequences, CRM storage, and analytics.",
    },
    {
      title: "Design As A Trust Accelerator",
      desc: "A calm, elegant, typographic visual language commands higher pricing power and elevates market perception far above competitors.",
    },
    {
      title: "Autonomous Operational Velocity",
      desc: "Repetitive tasks should be handled by AI and webhook pipelines, liberating human teams to focus on strategy and high-ticket relationships.",
    },
    {
      title: "Technical Sovereignty",
      desc: "We build on open, robust technologies like Next.js and MongoDB so you own your code, your data, and your customer relationships forever.",
    },
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
      {/* Header */}
      <section className="space-y-6">
        <Badge variant="blue">Studio Story</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#171717] leading-[1.05]">
          WE DON&apos;T JUST BUILD WEBSITES. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C72B2] to-[#1D68BD]">
            WE BUILD DIGITAL SYSTEMS.
          </span>
        </h1>
        <p className="text-lg sm:text-2xl font-tech font-medium text-[#6F6F6F] leading-relaxed">
          &ldquo;Systems that connect design, technology, AI, software, automation, and digital growth to turn business ideas into operating reality.&rdquo;
        </p>
      </section>

      {/* Founder Section */}
      <section className="p-6 sm:p-12 rounded-3xl bg-[#FAFAF8] border border-[#EAEAE7] shadow-uxi-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-[#EAEAE7] text-center space-y-3">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#2C72B2] to-[#1D68BD] flex items-center justify-center text-white text-2xl font-black shadow-uxi-glow">
            PV
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#171717]">Pavan Vedesh</h3>
            <p className="text-xs font-mono uppercase text-[#2C72B2] font-bold">
              Founder & Lead Architect
            </p>
          </div>
        </div>

        <div className="md:col-span-8 space-y-4 text-sm sm:text-base text-[#6F6F6F] leading-relaxed">
          <p className="text-[#171717] font-semibold text-lg">
            A note from our founder:
          </p>
          <p>
            I founded UXI TECH with the conviction that most businesses are underserved by traditional digital agencies. Agencies typically deliver a visually styled template, hand off the keys, and disappear—leaving the business with an disconnected asset that doesn&apos;t generate leads, talk to their database, or automate their work.
          </p>
          <p>
            At UXI (Unified Xperience Intelligence), we approach digital products as complete, interconnected operating systems. When we build for you, we consider your entire customer lifecycle: from the first Google search impression to instant WhatsApp AI follow-up, CRM synchronization, and operational software.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#2C72B2] font-bold">
            Studio Convictions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">
            How We Think & Build
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((pr) => (
            <div
              key={pr.title}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAEAE7] shadow-uxi-sm space-y-3"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-[#171717]">
                <CheckCircle2 className="w-4 h-4 text-[#2C72B2] shrink-0" />
                <h3>{pr.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#6F6F6F] leading-relaxed">
                {pr.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="p-6 sm:p-14 rounded-3xl bg-[#EBF3FA] border border-[#D5E7F7] text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717]">
          Let&apos;s build something exceptional together.
        </h2>
        <p className="text-sm text-[#6F6F6F] max-w-md mx-auto">
          Start with our 6-step project wizard or schedule an architectural consultation with our engineering team.
        </p>
        <div className="pt-2">
          <Button href="/contact" variant="primary" size="lg" className="w-full sm:w-auto justify-center">
            START A PROJECT
          </Button>
        </div>
      </section>
    </div>
  );
}
