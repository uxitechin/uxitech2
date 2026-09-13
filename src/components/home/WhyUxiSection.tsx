"use client";

import React from "react";
import { motion } from "framer-motion";
import Badge from "../ui/Badge";
import { Palette, Cpu, TrendingUp } from "lucide-react";

const PILLARS = [
  {
    concept: "DESIGN.",
    hook: "BEAUTIFUL ENOUGH TO REMEMBER.",
    desc: "We reject generic web templates. Every interface is a custom-crafted digital canvas designed with distinct typography, tactile interactions, and unforgettable brand character.",
    icon: Palette,
  },
  {
    concept: "TECHNOLOGY.",
    hook: "SMART ENOUGH TO AUTOMATE.",
    desc: "Underneath the serene surface lies serious engineering: Next.js edge runtimes, resilient MongoDB schemas, and autonomous AI pipelines executing with zero manual intervention.",
    icon: Cpu,
  },
  {
    concept: "BUSINESS.",
    hook: "PRACTICAL ENOUGH TO GROW.",
    desc: "We don't build vanity technology. Every pixel, form, and webhook is aligned with pipeline velocity, qualified lead generation, and compounding enterprise revenue.",
    icon: TrendingUp,
  },
];

export default function WhyUxiSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <Badge variant="blue">11 — Studio Philosophy</Badge>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171717] break-words">
            DESIGN. TECHNOLOGY. BUSINESS.
          </h2>
          <p className="text-base sm:text-xl text-[#6F6F6F] leading-relaxed">
            &ldquo;We don&apos;t build technology for the sake of technology. We build digital solutions that solve real problems.&rdquo;
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.concept}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="p-6 sm:p-8 rounded-3xl bg-[#FAFAF8] border border-[#EAEAE7] shadow-uxi-sm hover:shadow-uxi-md hover:border-[#2C72B2]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#2C72B2]">
                      0{idx + 1}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white border border-[#EAEAE7] flex items-center justify-center text-[#171717] group-hover:text-[#2C72B2] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#6F6F6F] block mb-1">
                      {pillar.concept}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#171717] tracking-tight">
                      {pillar.hook}
                    </h3>
                  </div>

                  <p className="text-sm text-[#6F6F6F] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-8 mt-6 border-t border-[#EAEAE7]/80">
                  <span className="w-2 h-2 rounded-full bg-[#2C72B2] inline-block mr-2" />
                  <span className="text-[11px] font-mono text-[#171717] font-medium">
                    Verified UXI Standard
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
