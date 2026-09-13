"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { seedProjects } from "@/lib/db/seedData";

export default function WorkPreviewSection() {
  return (
    <section id="work" className="py-24 sm:py-32 bg-[#FFFFFF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <Badge variant="blue">09 — Selected Work</Badge>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#171717]">
              PROOF, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C72B2] to-[#1D68BD]">
                NOT PROMISES.
              </span>
            </h2>
          </div>
          <div className="max-w-md space-y-4">
            <p className="text-sm sm:text-base text-[#6F6F6F]">
              Real digital systems engineered for modern clients. We prioritize structural performance, elegant interfaces, and measurable business outcomes.
            </p>
            <Button href="/work" variant="outline" size="sm" className="w-full sm:w-auto justify-center">
              VIEW ALL CASE STUDIES
            </Button>
          </div>
        </div>

        {/* Asymmetric Project Presentation Showcase */}
        <div className="space-y-12">
          {seedProjects.map((project, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`rounded-3xl p-4 sm:p-10 border border-[#EAEAE7] bg-[#FAFAF8] shadow-uxi-sm hover:shadow-uxi-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual Preview / Graphical Showcase Container */}
                <div
                  className={`lg:col-span-7 bg-white rounded-2xl p-5 sm:p-8 border border-[#EAEAE7] min-h-[260px] sm:min-h-[300px] flex flex-col justify-between relative overflow-hidden group ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#2C72B2]/10 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500 pointer-events-none" />

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#2C72B2]">
                      0{project.order} / CASE STUDY
                    </span>
                    <Badge variant="neutral">{project.category}</Badge>
                  </div>

                  <div className="py-12 text-center">
                    <h4 className="text-3xl sm:text-5xl font-black text-[#171717] tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#2C72B2] group-hover:to-[#1D68BD] transition-all duration-300">
                      {project.title}
                    </h4>
                    <p className="text-xs sm:text-sm font-mono text-[#6F6F6F] mt-2">
                      Client: {project.client}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-[#EAEAE7]">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full bg-[#FAFAF8] text-[10px] font-mono text-[#171717] border border-[#EAEAE7]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Metadata & Narrative */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#2C72B2]">
                      Overview
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#171717] mt-1">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-sm text-[#6F6F6F] leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-3 pt-2 border-t border-[#EAEAE7]">
                    <div>
                      <span className="text-[11px] font-mono uppercase text-[#6F6F6F] block">
                        The Challenge
                      </span>
                      <p className="text-xs text-[#171717] mt-0.5 line-clamp-2">
                        {project.challenge}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono uppercase text-[#6F6F6F] block">
                        Verified Result
                      </span>
                      <p className="text-xs text-[#171717] font-semibold mt-0.5">
                        {project.result}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      href={`/work/${project.slug}`}
                      variant="primary"
                      size="md"
                      className="w-full sm:w-auto justify-center"
                    >
                      VIEW CASE STUDY
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
