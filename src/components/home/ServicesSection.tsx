"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";
import { seedServices } from "@/lib/db/seedData";

export default function ServicesSection() {
  const [openSlug, setOpenSlug] = useState<string>("websites-and-web-applications");

  // Group services by their 6 official categories
  const categories = [
    { title: "BUILD", description: "Flagship web platforms & mobile products" },
    { title: "INTELLIGENCE", description: "Autonomous AI agents & custom CRM infrastructure" },
    { title: "SYSTEMS", description: "Bespoke operating software & ERP architecture" },
    { title: "IDENTITY", description: "Cohesive visual systems & typographic authority" },
    { title: "GROWTH", description: "High-intent paid acquisition & technical search dominance" },
    { title: "EDUCATION", description: "Rigorous academic engineering & prototype development" },
  ];

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#FFFDF9] relative border-t border-[#EAEAE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <Badge variant="blue">03 — Services & Systems</Badge>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#171717]">
              STRUCTURED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C72B2] to-[#1D68BD]">
                CAPABILITIES.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6F6F6F] max-w-md">
            All nine core UXI offerings grouped into 6 architectural disciplines. Click any service to inspect what it solves, what we engineer, and the execution pipeline.
          </p>
        </div>

        {/* Categories & Service Items */}
        <div className="space-y-12">
          {categories.map((cat) => {
            const catServices = seedServices.filter((s) => s.category === cat.title);
            if (catServices.length === 0) return null;

            return (
              <div key={cat.title} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#EAEAE7]">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#2C72B2]">
                      {cat.title}
                    </span>
                    <span className="text-xs text-[#6F6F6F]">· {cat.description}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {catServices.map((service) => {
                    const isOpen = openSlug === service.slug;

                    return (
                      <div
                        key={service.slug}
                        className={`rounded-2xl transition-all duration-200 border ${
                          isOpen
                            ? "bg-[#FAFAF8] border-[#2C72B2]/40 shadow-uxi-md"
                            : "bg-white hover:bg-[#FAFAF8] border-[#EAEAE7]"
                        }`}
                      >
                        {/* Accordion Trigger Header */}
                        <button
                          type="button"
                          onClick={() => setOpenSlug(isOpen ? "" : service.slug)}
                          className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2C72B2] rounded-2xl"
                        >
                          <div className="flex items-center gap-3 sm:gap-4">
                            <span className="text-xs font-mono text-[#6F6F6F]">
                              {String(service.order).padStart(2, "0")}
                            </span>
                            <div>
                              <h3 className="text-base sm:text-xl font-bold text-[#171717]">
                                {service.title}
                              </h3>
                              <p className="text-xs text-[#6F6F6F] hidden sm:block mt-0.5">
                                {service.tagline}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                            <span className="text-xs font-mono text-[#2C72B2] hidden md:inline-block">
                              {isOpen ? "Close Specification" : "Inspect Architecture"}
                            </span>
                            <div
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border transition-transform duration-200 ${
                                isOpen
                                  ? "bg-[#171717] text-white border-[#171717] rotate-180"
                                  : "bg-white text-[#171717] border-[#EAEAE7]"
                              }`}
                            >
                              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </div>
                          </div>
                        </button>

                        {/* Accordion Expanded Content */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-2 border-t border-[#EAEAE7]/80 space-y-6">
                                {/* Problem Solved vs What UXI Builds */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="p-4 rounded-xl bg-white border border-[#EAEAE7]">
                                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#1D68BD] font-bold block mb-1">
                                      What It Solves
                                    </span>
                                    <p className="text-xs sm:text-sm text-[#171717] leading-relaxed">
                                      {service.whatItSolves}
                                    </p>
                                  </div>

                                  <div className="p-4 rounded-xl bg-[#EBF3FA] border border-[#D5E7F7]">
                                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#2C72B2] font-bold block mb-1">
                                      What UXI Builds
                                    </span>
                                    <p className="text-xs sm:text-sm text-[#171717] leading-relaxed font-medium">
                                      {service.whatUxiBuilds}
                                    </p>
                                  </div>
                                </div>

                                {/* Capabilities */}
                                <div>
                                  <span className="text-xs font-mono uppercase tracking-wider text-[#6F6F6F] block mb-2">
                                    Technical Capabilities
                                  </span>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {service.capabilities.map((cap) => (
                                      <div
                                        key={cap}
                                        className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#EAEAE7] text-xs text-[#171717]"
                                      >
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2C72B2] shrink-0" />
                                        <span>{cap}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Structured Process Pipeline */}
                                <div>
                                  <span className="text-xs font-mono uppercase tracking-wider text-[#6F6F6F] block mb-2">
                                    Execution Process
                                  </span>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    {service.process.map((step) => (
                                      <div
                                        key={step.step}
                                        className="p-3 rounded-xl bg-white border border-[#EAEAE7] space-y-1"
                                      >
                                        <span className="text-xs font-mono font-bold text-[#2C72B2]">
                                          {step.step}
                                        </span>
                                        <p className="text-xs font-bold text-[#171717]">
                                          {step.title}
                                        </p>
                                        <p className="text-[11px] text-[#6F6F6F] leading-tight">
                                          {step.description}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* CTA Footer */}
                                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="text-[11px] font-mono text-[#6F6F6F]">Stack:</span>
                                    {service.technologies.map((t) => (
                                      <span
                                        key={t}
                                        className="px-2 py-0.5 rounded-md bg-[#F5F5F3] text-[10px] font-mono text-[#171717]"
                                      >
                                        {t}
                                      </span>
                                    ))}
                                  </div>

                                  <Button
                                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                                    variant="primary"
                                    size="sm"
                                    className="w-full sm:w-auto justify-center"
                                  >
                                    INITIATE {service.category} PROJECT
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
