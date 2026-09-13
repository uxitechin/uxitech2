"use client";

import React from "react";
import { motion } from "framer-motion";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function FounderSection() {
  return (
    <section className="py-24 sm:py-36 bg-[#FFFFFF] relative overflow-hidden">
      {/* Warm ambient radial glow */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-[#2C72B2]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-6 mb-12">
          <Badge variant="blue">13 — Leadership & Vision</Badge>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#171717]">
            BEHIND UXI.
          </h2>
        </div>

        {/* Editorial Layout */}
        <div className="bg-[#FAFAF8] rounded-3xl p-6 sm:p-14 border border-[#EAEAE7] shadow-uxi-md grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column: Monogram & Identity Card */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-white border border-[#EAEAE7] text-center space-y-4 shadow-sm">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#2C72B2] to-[#1D68BD] flex items-center justify-center text-white text-2xl sm:text-3xl font-black shadow-uxi-glow">
              PV
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-[#171717] tracking-tight">
                PAVAN VEDESH
              </h3>
              <p className="text-xs font-mono uppercase tracking-widest text-[#2C72B2] font-bold mt-1">
                Founder — UXI TECH
              </p>
            </div>

            <p className="text-xs text-[#6F6F6F] leading-relaxed pt-2 border-t border-[#EAEAE7]">
              Product architect, systems thinker & creative director leading UXI&apos;s digital engineering.
            </p>
          </div>

          {/* Right Column: Narrative, Philosophy & Vision */}
          <div className="lg:col-span-8 space-y-6 text-left">
            <blockquote className="text-lg sm:text-2xl font-tech font-medium text-[#171717] leading-relaxed">
              &ldquo;Modern businesses don&apos;t need another fragile website or an isolated marketing campaign. They need a unified digital system where design commands respect, software eliminates friction, and automated intelligence runs around the clock.&rdquo;
            </blockquote>

            <div className="space-y-4 text-sm text-[#6F6F6F] leading-relaxed">
              <p>
                UXI was founded with a singular conviction: that the divide between world-class visual design and serious technical engineering is artificial. We bring both disciplines under one roof to build digital products that move businesses forward.
              </p>
              <p>
                From bespoke web platforms and mobile apps to custom WhatsApp automation and enterprise CRMs, our approach is rooted in uncompromising craft, transparent architecture, and measurable velocity.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Button href="/about" variant="outline" size="sm" className="w-full sm:w-auto justify-center">
                READ THE STUDIO STORY
              </Button>
              <Button href="/contact" variant="primary" size="sm" className="w-full sm:w-auto justify-center">
                SPEAK WITH PAVAN & TEAM
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
