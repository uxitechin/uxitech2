"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import {
  Lightbulb,
  Sparkles,
  Globe,
  Smartphone,
  Layers,
  Database,
  Cpu,
  Target,
  Search,
  TrendingUp,
} from "lucide-react";

const SYSTEM_STAGES = [
  { step: "01", name: "IDEA", icon: Lightbulb, label: "The Initial Vision", color: "from-[#2C72B2] to-[#FFA066]" },
  { step: "02", name: "BRAND", icon: Sparkles, label: "Visual System & Authority", color: "from-[#FFA066] to-[#2C72B2]" },
  { step: "03", name: "WEBSITE", icon: Globe, label: "Digital Flagship", color: "from-[#2C72B2] to-[#1D68BD]" },
  { step: "04", name: "APPLICATION", icon: Smartphone, label: "Tactile Mobile Product", color: "from-[#1D68BD] to-[#1D68BD]" },
  { step: "05", name: "SOFTWARE", icon: Layers, label: "Custom ERP & Operations", color: "from-[#1D68BD] to-[#FF6E6E]" },
  { step: "06", name: "CRM", icon: Database, label: "Relationship Velocity", color: "from-[#FF6E6E] to-[#1D68BD]" },
  { step: "07", name: "AI AUTOMATION", icon: Cpu, label: "Self-Executing Workflows", color: "from-[#1D68BD] to-[#FF7A45]" },
  { step: "08", name: "MARKETING", icon: Target, label: "Precision Paid Traffic", color: "from-[#FF7A45] to-[#2C72B2]" },
  { step: "09", name: "SEO", icon: Search, label: "Compounding Organic Rank", color: "from-[#2C72B2] to-[#FFA726]" },
  { step: "10", name: "GROWTH", icon: TrendingUp, label: "Predictable Expansion", color: "from-[#FFA726] to-[#2C72B2]" },
];

export default function StorytellingSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  return (
    <section className="py-28 sm:py-36 bg-[#FAFAF8] border-y border-[#EAEAE7] relative overflow-hidden">
      {/* Atmosphere Glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-gradient-to-l from-[#2C72B2]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="blue">04 — System Construction</Badge>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171717]">
            &ldquo;I HAVE AN IDEA.&rdquo;
          </h2>
          <p className="text-base sm:text-lg text-[#6F6F6F]">
            Here is how UXI turns that single spark into an integrated, self-sustaining business system.
          </p>
        </div>

        {/* Pipeline Progression Track */}
        <div className="bg-white rounded-3xl p-4 sm:p-10 border border-[#EAEAE7] shadow-uxi-md">
          {/* Timeline steps */}
          <div className="flex sm:grid sm:grid-cols-5 lg:grid-cols-10 gap-2 mb-8 overflow-x-auto touch-pan-x no-scrollbar pb-2">
            {SYSTEM_STAGES.map((stg, idx) => {
              const isPassed = idx <= activeStageIndex;
              const isCurrent = idx === activeStageIndex;
              const Icon = stg.icon;

              return (
                <button
                  key={stg.name}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`p-2.5 sm:p-3 rounded-xl flex flex-col items-center text-center transition-all duration-200 border min-w-[95px] sm:min-w-0 shrink-0 sm:shrink ${
                    isCurrent
                      ? "bg-[#EBF3FA] border-[#2C72B2] shadow-sm scale-105"
                      : isPassed
                      ? "bg-[#FAFAF8] border-[#D5E7F7] text-[#171717]"
                      : "bg-white border-[#EAEAE7] text-[#8E8E8E] hover:border-[#171717]/20"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 sm:w-5 sm:h-5 mb-1 ${
                      isPassed ? "text-[#2C72B2]" : "text-[#8E8E8E]"
                    }`}
                  />
                  <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wider">
                    {stg.name}
                  </span>
                  <span className="text-[9px] font-mono text-[#8E8E8E] mt-0.5">
                    {stg.step}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Highlight Card */}
          <div className="p-5 sm:p-8 rounded-2xl bg-[#FFFDF9] border border-[#D5E7F7]/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-[#2C72B2] text-white text-[10px] font-mono font-bold">
                  Stage {SYSTEM_STAGES[activeStageIndex].step} of 10
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#6F6F6F]">
                  Integrated Milestone
                </span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-[#171717]">
                {SYSTEM_STAGES[activeStageIndex].name}: {SYSTEM_STAGES[activeStageIndex].label}
              </h3>
              <p className="text-xs sm:text-sm text-[#6F6F6F] max-w-xl leading-relaxed">
                Every component is not an isolated silo—it is engineered to feed data, customers, and authority directly into the next stage of your business growth.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
              <button
                type="button"
                disabled={activeStageIndex === 0}
                onClick={() => setActiveStageIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 text-xs font-semibold rounded-full border border-[#EAEAE7] bg-white hover:bg-[#FAFAF8] disabled:opacity-40 transition-colors"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={activeStageIndex === SYSTEM_STAGES.length - 1}
                onClick={() =>
                  setActiveStageIndex((prev) =>
                    Math.min(SYSTEM_STAGES.length - 1, prev + 1)
                  )
                }
                className="px-5 py-2 text-xs font-semibold rounded-full bg-[#171717] text-white hover:bg-[#262626] disabled:opacity-40 transition-colors"
              >
                Next Stage →
              </button>
            </div>
          </div>

          {/* Punchline Footer */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#EAEAE7] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2C72B2] font-bold">
                The Conclusion
              </span>
              <h4 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight mt-1">
                THAT&apos;S WHAT UXI DOES.
              </h4>
            </div>

            <Button href="/contact" variant="primary" size="md" className="w-full sm:w-auto justify-center">
              START BUILDING YOUR SYSTEM
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
