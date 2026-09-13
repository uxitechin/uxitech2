"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

const BRAND_STEPS = [
  {
    step: "01",
    name: "Atomic Dot",
    desc: "A singular tech blue focal point (#2C72B2) containing brand energy.",
  },
  {
    step: "02",
    name: "Logomark",
    desc: "Unified Xperience Intelligence geometric mark forming U-X-i.",
  },
  {
    step: "03",
    name: "Typography",
    desc: "Modern architectural sans-serif paired with Space Grotesk technical typography.",
  },
  {
    step: "04",
    name: "Colour System",
    desc: "Crisp light canvases (#FFFDF9) elevated by authentic UXI Blue (#2C72B2).",
  },
  {
    step: "05",
    name: "Visual Identity",
    desc: "Tactile micro-borders, translucent frosted surfaces, and rhythmic whitespace.",
  },
  {
    step: "06",
    name: "Brand System",
    desc: "A cohesive, living identity spanning web, mobile, decks, and marketing.",
  },
];

export default function BrandingTransformation() {
  const [selectedStep, setSelectedStep] = useState(0);

  return (
    <section className="py-24 sm:py-32 bg-[#FAFAF8] border-y border-[#EAEAE7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Brand Stepper */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <Badge variant="blue">06 — Identity Engineering</Badge>

            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#171717] leading-[1.05]">
              MAKE YOUR <br />
              BUSINESS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C72B2] to-[#1D68BD]">
                RECOGNIZABLE.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#6F6F6F] leading-relaxed">
              True brand identity isn&apos;t just a pretty logo. It is an intentional visual operating system that commands authority, justifies premium pricing, and embeds in memory.
            </p>

            {/* Stepper Navigation */}
            <div className="space-y-2">
              {BRAND_STEPS.map((s, idx) => (
                <button
                  key={s.step}
                  onClick={() => setSelectedStep(idx)}
                  className={`w-full p-3 rounded-xl flex items-center justify-between transition-all duration-200 border text-left ${
                    selectedStep === idx
                      ? "bg-white border-[#2C72B2] shadow-sm ring-1 ring-[#2C72B2]/20"
                      : "bg-transparent border-transparent hover:bg-white/60 text-[#6F6F6F]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-sans font-bold text-[#2C72B2]">
                      {s.step}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#171717]">
                      {s.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#8E8E8E] hidden sm:inline-block">
                    {s.desc}
                  </span>
                </button>
              ))}
            </div>

            <Button href="/contact?service=Branding+%26+Graphic+Design" variant="primary" size="md" className="w-full sm:w-auto justify-center">
              CRAFT YOUR BRAND IDENTITY
            </Button>
          </div>

          {/* Right Column: Visual Stage Construction */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-12 border border-[#EAEAE7] shadow-uxi-md min-h-[360px] sm:min-h-[460px] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Ambient canvas glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#EBF3FA]/50 to-transparent pointer-events-none" />

            <AnimatePresence mode="wait">
              {selectedStep === 0 && (
                 <motion.div
                   key="dot"
                   initial={{ scale: 0, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   exit={{ scale: 0, opacity: 0 }}
                   className="flex flex-col items-center gap-4"
                 >
                   <div className="w-16 h-16 rounded-full bg-[#2C72B2] shadow-uxi-glow animate-pulse" />
                   <span className="text-xs font-sans uppercase tracking-widest text-[#6F6F6F] font-semibold">
                     The Seed Dot (#2C72B2)
                   </span>
                 </motion.div>
               )}

              {selectedStep === 1 && (
                <motion.div
                  key="logo"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="text-6xl sm:text-8xl font-black text-[#171717] tracking-tight">
                    U
                    <span className="text-[#2C72B2]">
                      X
                    </span>
                    i
                  </div>
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#6F6F6F]">
                    UNIFIED · XPERIENCE · INTELLIGENCE
                  </span>
                </motion.div>
              )}

              {selectedStep === 2 && (
                <motion.div
                  key="typography"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="space-y-4 text-center max-w-sm"
                >
                  <p className="text-3xl font-extrabold text-[#171717]">
                    Plus Jakarta Sans
                  </p>
                  <p className="text-2xl font-tech font-bold text-[#1D68BD] tracking-tight">
                    Space Grotesk Technical
                  </p>
                  <span className="text-xs font-sans uppercase tracking-widest text-[#6F6F6F] block font-semibold">
                    Dual System Typography
                  </span>
                </motion.div>
              )}

              {selectedStep === 3 && (
                <motion.div
                  key="colours"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="grid grid-cols-2 gap-3 w-full max-w-xs"
                >
                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#EAEAE7] text-center shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-[#FFFFFF] border mx-auto mb-2" />
                    <span className="text-[10px] font-mono text-[#171717]">#FFFDF9</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#EBF3FA] border border-[#D5E7F7] text-center shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-[#2C72B2] mx-auto mb-2" />
                    <span className="text-[10px] font-mono text-[#2C72B2]">#2C72B2</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#EBF3FA] border border-[#D5E7F7] text-center shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-[#1D68BD] mx-auto mb-2" />
                    <span className="text-[10px] font-mono text-[#1D68BD]">#1D68BD</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#EAEAE7] text-center shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-[#171717] mx-auto mb-2" />
                    <span className="text-[10px] font-mono text-[#171717]">#171717</span>
                  </div>
                </motion.div>
              )}

              {selectedStep === 4 && (
                <motion.div
                  key="identity"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="space-y-3 w-full max-w-sm"
                >
                  <div className="p-4 rounded-2xl bg-[#EBF3FA] border border-[#D5E7F7] shadow-uxi-sm flex items-center justify-between">
                    <span className="text-xs font-bold text-[#171717]">Primary Identity Card</span>
                    <span className="w-2 h-2 rounded-full bg-[#2C72B2]" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-[#EAEAE7] shadow-sm flex items-center justify-between">
                    <span className="text-xs font-medium text-[#6F6F6F]">Translucent Token</span>
                    <span className="text-[10px] font-mono text-[#8E8E8E]">v2.0</span>
                  </div>
                </motion.div>
              )}

              {selectedStep === 5 && (
                <motion.div
                  key="system"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#2C72B2]/40 shadow-uxi-md text-center space-y-3 max-w-sm"
                >
                  <Badge variant="blue">Living Brand System</Badge>
                  <h4 className="text-xl font-extrabold text-[#171717]">
                    Complete Cross-Platform Authority
                  </h4>
                  <p className="text-xs text-[#6F6F6F]">
                    Web · iOS · Android · Marketing · Presentations
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
