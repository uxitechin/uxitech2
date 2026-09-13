"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import {
  MessageSquare,
  Cpu,
  Database,
  CheckSquare,
  Send,
  BarChart3,
  Play,
  RotateCcw,
} from "lucide-react";

const WORKFLOW_STEPS = [
  {
    title: "CUSTOMER MESSAGE",
    desc: "Inbound query on WhatsApp or Web: 'I need enterprise software architecture.'",
    icon: MessageSquare,
  },
  {
    title: "AI UNDERSTANDS",
    desc: "LLM agent extracts entity, budget range, urgency, and technical requirements.",
    icon: Cpu,
  },
  {
    title: "CRM UPDATED",
    desc: "Contact record, intent tags, and deal prospect created in MongoDB database.",
    icon: Database,
  },
  {
    title: "TASK CREATED",
    desc: "Assigned to engineering lead with meeting calendar slot prioritized.",
    icon: CheckSquare,
  },
  {
    title: "CUSTOMER FOLLOW-UP",
    desc: "Instant personalized WhatsApp confirmation & consultation brief sent.",
    icon: Send,
  },
  {
    title: "ANALYTICS UPDATED",
    desc: "Acquisition channel, lead velocity, and forecast dashboard refreshed.",
    icon: BarChart3,
  },
];

const CAPABILITIES = [
  "Custom AI Assistants & Copilots",
  "Meta WhatsApp Business Automation",
  "Autonomous Multi-Step Workflows",
  "CRM Pipeline Synchronization",
  "24/7 AI Customer Triage",
  "Lead Scoring & Routing",
  "Proactive Notification Bots",
  "Real-Time Analytics Ingestion",
];

export default function AiAutomationSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % WORKFLOW_STEPS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <section className="py-24 sm:py-32 bg-[#FFFFFF] relative overflow-hidden">
      {/* Warm atmospheric light */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-[#2C72B2]/10 via-[#1D68BD]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Vision & Capabilities */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <Badge variant="blue">05 — Autonomous Intelligence</Badge>

            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#171717] leading-[1.05]">
              WHAT IF YOUR <br />
              BUSINESS COULD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C72B2] to-[#1D68BD]">
                THINK?
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#6F6F6F] leading-relaxed">
              We replace tedious manual operational loops with intelligent, self-executing automation systems that qualify leads, synchronize records, and support customers 24 hours a day.
            </p>

            {/* Capability Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {CAPABILITIES.map((cap) => (
                <div
                  key={cap}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-xs font-medium text-[#171717]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2C72B2]" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button href="/contact?service=AI+%26+Business+Automation" variant="primary" size="md" className="w-full sm:w-auto justify-center">
                AUTOMATE YOUR BUSINESS
              </Button>
            </div>
          </div>

          {/* Right Column: Interactive Animated Workflow Simulator */}
          <div className="lg:col-span-6 bg-[#FAFAF8] rounded-3xl p-4 sm:p-8 border border-[#EAEAE7] shadow-uxi-md space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAEAE7]">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#6F6F6F]">
                  Autonomous Execution Simulator
                </span>
                <p className="text-xs text-[#171717] font-semibold mt-0.5">
                  End-to-End WhatsApp & CRM Workflow
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsRunning(!isRunning)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-white border border-[#EAEAE7] text-[#171717] hover:bg-[#EBF3FA] transition-colors"
              >
                {isRunning ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#2C72B2] animate-ping" />
                    <span>Active Simulation</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-[#2C72B2]" />
                    <span>Resume</span>
                  </>
                )}
              </button>
            </div>

            {/* Workflow Stack */}
            <div className="space-y-3">
              {WORKFLOW_STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                const isCompleted = activeStep > idx;
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.title}
                    animate={{
                      scale: isActive ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.25 }}
                    onClick={() => {
                      setIsRunning(false);
                      setActiveStep(idx);
                    }}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border flex items-start gap-4 ${
                      isActive
                        ? "bg-white border-[#2C72B2] shadow-uxi-md ring-2 ring-[#2C72B2]/20"
                        : isCompleted
                        ? "bg-white/80 border-[#D5E7F7] text-[#171717]"
                        : "bg-white/40 border-[#EAEAE7] text-[#8E8E8E]"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        isActive
                          ? "bg-[#EBF3FA] text-[#2C72B2] border-[#2C72B2]"
                          : isCompleted
                          ? "bg-[#FAFAF8] text-[#2C72B2] border-[#D5E7F7]"
                          : "bg-white text-[#8E8E8E] border-[#EAEAE7]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold tracking-tight">
                          {step.title}
                        </span>
                        <span className="text-[10px] font-mono text-[#8E8E8E]">
                          Step 0{idx + 1}
                        </span>
                      </div>
                      <p className="text-xs text-[#6F6F6F] mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Controls */}
            <div className="pt-2 flex items-center justify-between text-xs text-[#6F6F6F]">
              <span>Click any step to inspect manual trigger</span>
              <button
                type="button"
                onClick={() => {
                  setActiveStep(0);
                  setIsRunning(true);
                }}
                className="flex items-center gap-1 text-[#2C72B2] hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                Restart Flow
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
