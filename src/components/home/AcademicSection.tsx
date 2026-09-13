"use client";

import React from "react";
import { motion } from "framer-motion";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { BookOpen, Lightbulb, Compass, Code2, Cpu, Presentation } from "lucide-react";

const ACADEMIC_STAGES = [
  { name: "RESEARCH", desc: "Literature review & problem domain definition", icon: BookOpen },
  { name: "IDEA", desc: "Hypothesis formation & technical feasibility", icon: Lightbulb },
  { name: "DESIGN", desc: "System architecture, data flow & model pipelines", icon: Compass },
  { name: "DEVELOPMENT", desc: "Rigorous production-grade code & benchmarks", icon: Code2 },
  { name: "PROTOTYPE", desc: "Live functional cloud or hardware deployment", icon: Cpu },
  { name: "PRESENTATION", desc: "Architectural documentation & technical defense prep", icon: Presentation },
];

export default function AcademicSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#FAFAF8] border-y border-[#EAEAE7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <Badge variant="blue">08 — Technical Engineering</Badge>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#171717] leading-[1.05]">
              FROM <br />
              CONCEPT <br />
              TO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C72B2] to-[#1D68BD]">
                PROTOTYPE.
              </span>
            </h2>
          </div>
          <div className="max-w-md space-y-4">
            <p className="text-sm sm:text-base text-[#6F6F6F]">
              Structured technical engineering mentorship for computer science and engineering researchers. We focus strictly on genuine systems architecture, reproducible benchmarks, and clean code.
            </p>
            <Button
              href="/contact?service=Academic+Project+Development"
              variant="outline"
              size="sm"
              className="w-full sm:w-auto justify-center"
            >
              INQUIRE FOR TECHNICAL RESEARCH
            </Button>
          </div>
        </div>

        {/* Academic Pipeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {ACADEMIC_STAGES.map((stg, idx) => {
            const Icon = stg.icon;
            return (
              <motion.div
                key={stg.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="p-5 rounded-2xl bg-white border border-[#EAEAE7] shadow-sm hover:shadow-uxi-md hover:border-[#2C72B2]/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono text-[#2C72B2] font-bold">
                      0{idx + 1}
                    </span>
                    <Icon className="w-4 h-4 text-[#8E8E8E]" />
                  </div>
                  <h3 className="text-sm font-extrabold text-[#171717] tracking-tight">
                    {stg.name}
                  </h3>
                  <p className="text-xs text-[#6F6F6F] mt-1.5 leading-relaxed">
                    {stg.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
