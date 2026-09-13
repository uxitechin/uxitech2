"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import UxiFlowCanvas from "../3d/UxiFlowCanvas";
import Badge from "../ui/Badge";
import { Sparkles, Cpu, TrendingUp } from "lucide-react";

// Distinct rotating value propositions tailored strictly to UXI TECH's core capabilities
const ROTATING_HEADLINES = [
  {
    highlight: "DIGITAL",
    noun: "MOMENTUM.",
    subtext:
      "Websites, applications, and digital platforms engineered to move businesses forward.",
    category: "Full-Stack Velocity",
  },
  {
    highlight: "INTELLIGENT",
    noun: "AUTOMATION.",
    subtext:
      "Autonomous AI assistants, Meta WhatsApp pipelines, and CRM systems that execute 24/7.",
    category: "AI & Operations",
  },
  {
    highlight: "CONNECTED",
    noun: "SYSTEMS.",
    subtext:
      "Custom back-office ERPs, relationship command centers, and scalable database architectures.",
    category: "Custom Software",
  },
  {
    highlight: "UNMISTAKABLE",
    noun: "BRANDS.",
    subtext:
      "Distinctive geometric typography, visual identity systems, and authority-building digital design.",
    category: "Brand & Design",
  },
  {
    highlight: "MEASURABLE",
    noun: "GROWTH.",
    subtext:
      "Technical search engine authority and precision Meta & Google ad funnels that compound revenue.",
    category: "Acquisition & SEO",
  },
];

export default function HeroSection() {
  const [activeMode, setActiveMode] = useState<"core" | "ai" | "growth">("core");
  const [headlineIndex, setHeadlineIndex] = useState(0);

  // Automatically cycle through UXI core pillars every 3.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % ROTATING_HEADLINES.length);
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  const currentHeadline = ROTATING_HEADLINES[headlineIndex];

  return (
    <section className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-16 overflow-hidden canvas-radial-glow">
      {/* Background delicate grid texture */}
      <div className="absolute inset-0 canvas-grid opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* Left Column: Expressive Dynamic Headline & Positioning */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-8 text-left">
            <div className="flex items-center gap-3">
              <Badge variant="blue">Digital Systems Studio</Badge>
              <span className="text-xs font-semibold text-[#8E8E8E] hidden sm:inline-block">
                0{headlineIndex + 1} / 0{ROTATING_HEADLINES.length} · {currentHeadline.category}
              </span>
            </div>

            {/* Dynamic Rotating Headline */}
            <div className="min-h-[140px] sm:min-h-[210px] lg:min-h-[260px]">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-[5.4rem] font-extrabold tracking-[-0.03em] sm:tracking-[-0.04em] text-[#171717] leading-[1.02] sm:leading-[0.96] break-words">
                <span className="block mb-1 sm:mb-2">WE BUILD</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentHeadline.highlight + currentHeadline.noun}
                    initial={{ y: 22, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -22, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C72B2] via-[#1D68BD] to-[#2563EB]">
                      {currentHeadline.highlight}
                    </span>{" "}
                    <br className="sm:hidden" />
                    <span>{currentHeadline.noun}</span>
                  </motion.span>
                </AnimatePresence>
              </h1>
            </div>

            {/* Dynamic Supporting Copy smoothly syncing with the active pillar */}
            <div className="min-h-[56px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentHeadline.subtext}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="text-base sm:text-xl text-[#6F6F6F] max-w-xl font-normal leading-relaxed"
                >
                  {currentHeadline.subtext}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Carousel Indicator Ticker */}
            <div className="flex items-center gap-2 pt-1">
              {ROTATING_HEADLINES.map((item, idx) => (
                <button
                  key={item.highlight}
                  type="button"
                  onClick={() => setHeadlineIndex(idx)}
                  aria-label={`Switch to ${item.highlight} ${item.noun}`}
                  className="group py-1 focus:outline-none"
                >
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === headlineIndex
                        ? "w-8 bg-gradient-to-r from-[#2C72B2] to-[#1D68BD]"
                        : "w-2 bg-[#EAEAE7] hover:bg-[#8E8E8E]"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <Button href="/contact" variant="primary" size="lg" className="w-full sm:w-auto justify-center">
                START A PROJECT
              </Button>
              <Button
                href="#ecosystem"
                variant="secondary"
                size="lg"
                arrowDirection="down"
                className="w-full sm:w-auto justify-center"
              >
                EXPLORE OUR WORK
              </Button>
            </div>

            {/* Core Philosophy Footnote */}
            <div className="pt-6 border-t border-[#EAEAE7]/80 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#2C72B2] animate-pulse shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-[#555555]">
                &ldquo;We don&apos;t just build websites. We build digital systems.&rdquo;
              </span>
            </div>
          </div>

          {/* Right Column: Signature 3D UXI Monogram & Ecosystem Sculpture */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex flex-col items-center justify-center">
            {/* Ambient subtle blue Under-Glow */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#2C72B2]/18 via-[#1D68BD]/10 to-transparent blur-3xl pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-[320px] sm:h-[460px] lg:h-[520px] relative flex items-center justify-center"
            >
              {/* 3D Canvas with U-X-I Monogram and Orbiting Nodes */}
              <UxiFlowCanvas
                variant="hero"
                mode={activeMode}
                className="w-full h-full"
              />

              {/* Floating Top Indicator */}
              <div className="absolute top-2 right-2 sm:right-4 bg-white/85 backdrop-blur-md px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-[#EAEAE7] shadow-uxi-sm flex items-center gap-2 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2C72B2] animate-ping" />
                <span className="text-[10px] sm:text-[11px] font-sans tracking-wider uppercase text-[#171717] font-bold">
                  Drag to rotate 3D
                </span>
              </div>
            </motion.div>

            {/* Interactive System Mode Selector Pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-2 flex items-center justify-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#EAEAE7] shadow-uxi-sm max-w-full overflow-x-auto no-scrollbar"
            >
              <button
                type="button"
                onClick={() => setActiveMode("core")}
                className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-sans font-semibold transition-all ${
                  activeMode === "core"
                    ? "bg-[#EBF3FA] text-[#2C72B2] font-bold border border-[#D5E7F7] shadow-xs"
                    : "text-[#6F6F6F] hover:text-[#171717]"
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Core System</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode("ai")}
                className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-sans font-semibold transition-all ${
                  activeMode === "ai"
                    ? "bg-[#EBF3FA] text-[#1D68BD] font-bold border border-[#D5E7F7] shadow-xs"
                    : "text-[#6F6F6F] hover:text-[#171717]"
                }`}
              >
                <Cpu className="w-3 h-3" />
                <span>Intelligence</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode("growth")}
                className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-sans font-semibold transition-all ${
                  activeMode === "growth"
                    ? "bg-[#EBF3FA] text-[#2563EB] font-bold border border-[#D5E7F7] shadow-xs"
                    : "text-[#6F6F6F] hover:text-[#171717]"
                }`}
              >
                <TrendingUp className="w-3 h-3" />
                <span>Velocity</span>
              </button>
            </motion.div>

            {/* Architectural Subtext */}
            <p className="text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-[#8E8E8E] mt-3">
              UXI Monogram · Multi-Layered Technological Sculpture
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
