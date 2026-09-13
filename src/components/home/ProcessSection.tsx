"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Badge from "../ui/Badge";

const STAGES = [
  {
    num: "01",
    name: "DISCOVER",
    action: "Understand.",
    desc: "We deconstruct your business model, customer journeys, operational bottlenecks, and competitive terrain.",
  },
  {
    num: "02",
    name: "THINK",
    action: "Strategize.",
    desc: "We define information architecture, tech stack decisions, conversion hypotheses, and integration endpoints.",
  },
  {
    num: "03",
    name: "DESIGN",
    action: "Experience.",
    desc: "We craft custom typographic hierarchies, light interactive canvases, motion dynamics, and micro-interactions.",
  },
  {
    num: "04",
    name: "BUILD",
    action: "Engineer.",
    desc: "Clean, componentized TypeScript engineering, resilient database schemas, and autonomous API webhook pipelines.",
  },
  {
    num: "05",
    name: "LAUNCH",
    action: "Deploy.",
    desc: "Core Web Vitals auditing, cross-device QA, edge caching setup, and seamless production launch.",
  },
  {
    num: "06",
    name: "GROW",
    action: "Optimize.",
    desc: "Continuous performance tuning, search authority compounding, and conversion rate iteration.",
  },
];

export default function ProcessSection() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section className="py-24 sm:py-32 bg-[#FAFAF8] border-y border-[#EAEAE7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <Badge variant="blue">12 — Execution Methodology</Badge>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#171717]">
              SIX PHASES TO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C72B2] to-[#1D68BD]">
                MOMENTUM.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6F6F6F] max-w-md">
            Our disciplined, battle-tested product development methodology. No guesswork, no delays—just systematic execution.
          </p>
        </div>

        {/* 6 Stage Track */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {STAGES.map((stg, idx) => {
            const isActive = activeStage === idx;
            return (
              <div
                key={stg.num}
                onClick={() => setActiveStage(idx)}
                onMouseEnter={() => setActiveStage(idx)}
                className={`p-5 sm:p-6 rounded-3xl cursor-pointer transition-all duration-300 border flex flex-col justify-between min-h-[220px] sm:min-h-[260px] ${
                  isActive
                    ? "bg-white border-[#2C72B2] shadow-uxi-md ring-2 ring-[#2C72B2]/20 scale-102"
                    : "bg-white/60 hover:bg-white border-[#EAEAE7]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isActive ? "text-[#2C72B2]" : "text-[#8E8E8E]"
                      }`}
                    >
                      {stg.num}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#2C72B2] animate-ping" />
                    )}
                  </div>
                  <h3 className="text-lg font-extrabold text-[#171717] tracking-tight">
                    {stg.name}
                  </h3>
                  <p className="text-xs font-tech font-bold uppercase tracking-wider text-[#1D68BD] mt-0.5">
                    {stg.action}
                  </p>
                </div>

                <p className="text-xs text-[#6F6F6F] leading-relaxed pt-6 border-t border-[#EAEAE7]">
                  {stg.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
