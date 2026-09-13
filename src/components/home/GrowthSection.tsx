"use client";

import React from "react";
import { motion } from "framer-motion";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { Eye, ArrowUpRight, Users, CheckCircle, TrendingUp } from "lucide-react";

const GROWTH_STAGES = [
  { name: "VISIBILITY", label: "Targeted Search & Meta Impressions", icon: Eye },
  { name: "TRAFFIC", label: "High-Intent Prospective Buyers", icon: ArrowUpRight },
  { name: "LEADS", label: "Qualified Form & WhatsApp Submissions", icon: Users },
  { name: "CUSTOMERS", label: "Transacted Clients in Pipeline", icon: CheckCircle },
  { name: "GROWTH", label: "Compounding Business Revenue", icon: TrendingUp },
];

export default function GrowthSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Positioning */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <Badge variant="blue">07 — Performance & Acquisition</Badge>

            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#171717] leading-[1.05]">
              FROM <br />
              VISIBILITY <br />
              TO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C72B2] to-[#1D68BD]">
                GROWTH.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#6F6F6F] leading-relaxed">
              We align technical Core Web Vitals SEO with surgical Meta and Google ad funnels to engineer a clean, measurable transition from raw market awareness into closed client revenue.
            </p>

            <div className="pt-2">
              <Button href="/contact?service=Meta+%26+Google+Ads" variant="primary" size="md" className="w-full sm:w-auto justify-center">
                ACCELERATE YOUR ACQUISITION
              </Button>
            </div>
          </div>

          {/* Right Column: Elegant Animated Growth Progression & Graph */}
          <div className="lg:col-span-6 bg-[#FAFAF8] rounded-3xl p-4 sm:p-8 border border-[#EAEAE7] shadow-uxi-md space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAEAE7]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#6F6F6F]">
                Acquisition Architecture
              </span>
              <span className="text-xs font-mono text-[#2C72B2]">Full Funnel Alignment</span>
            </div>

            {/* Visual Funnel Stack */}
            <div className="space-y-2.5">
              {GROWTH_STAGES.map((stg, idx) => {
                const Icon = stg.icon;
                return (
                  <motion.div
                    key={stg.name}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="p-3.5 rounded-2xl bg-white border border-[#EAEAE7] flex items-center justify-between shadow-sm hover:border-[#2C72B2]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#EBF3FA] text-[#2C72B2] border border-[#D5E7F7] flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-extrabold tracking-wider text-[#171717]">
                          {stg.name}
                        </h3>
                        <p className="text-[11px] text-[#6F6F6F]">{stg.label}</p>
                      </div>
                    </div>

                    <span className="text-xs font-mono text-[#8E8E8E]">0{idx + 1}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Clean Animated Vector Graph (No Fake Numbers) */}
            <div className="p-4 rounded-2xl bg-white border border-[#EAEAE7]">
              <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-[#6F6F6F]">
                <span>Pipeline Compounding Velocity</span>
                <span className="text-[#2C72B2] font-bold">Consistent Momentum</span>
              </div>

              <div className="h-28 w-full relative flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100">
                  <defs>
                    <linearGradient id="growthGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2C72B2" />
                      <stop offset="100%" stopColor="#1D68BD" />
                    </linearGradient>
                    <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2C72B2" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#1D68BD" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Area fill */}
                  <path
                    d="M 0,80 Q 75,70 150,45 T 300,10 L 300,100 L 0,100 Z"
                    fill="url(#areaGrad)"
                  />

                  {/* Primary smooth curve */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d="M 0,80 Q 75,70 150,45 T 300,10"
                    fill="none"
                    stroke="url(#growthGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Nodes on curve */}
                  <circle cx="0" cy="80" r="4" fill="#2C72B2" />
                  <circle cx="150" cy="45" r="4" fill="#1D68BD" />
                  <circle cx="300" cy="10" r="5" fill="#1D68BD" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
