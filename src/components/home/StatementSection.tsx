"use client";

import React from "react";
import { motion } from "framer-motion";
import Badge from "../ui/Badge";

export default function StatementSection() {
  return (
    <section className="relative py-16 sm:py-28 lg:py-36 bg-[#FAFAF8] border-y border-[#EAEAE7] overflow-hidden">
      {/* Delicate atmospheric glow */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#2C72B2]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="neutral">01 — Philosophy</Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] text-[#171717] leading-[1.05]"
          >
            AN IDEA <br />
            IS JUST <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C72B2] to-[#1D68BD]">
              THE BEGINNING.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-[#EAEAE7]"
          >
            <div className="md:col-span-8">
              <p className="text-xl sm:text-2xl text-[#171717] font-normal leading-relaxed">
                We turn ideas into digital experiences, intelligent systems and businesses that scale.
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end items-start">
              <p className="text-sm text-[#6F6F6F] leading-relaxed max-w-xs">
                A concept without robust architecture is just potential. UXI provides the technical velocity, design rigor, and automation infrastructure required to transform vision into an operational powerhouse.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
