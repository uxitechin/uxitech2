"use client";

import React from "react";
import { motion } from "framer-motion";

interface UxiFlowFallbackProps {
  className?: string;
  variant?: "hero" | "statement" | "ecosystem" | "contact";
}

export default function UxiFlowFallback({
  className = "",
  variant = "hero",
}: UxiFlowFallbackProps) {
  return (
    <div
      className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Outer ambient subtle blue glow */}
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#2C72B2]/20 via-[#1D68BD]/15 to-transparent blur-3xl" />

      {/* Fluid Glass Sculptural Forms inspired by U -> X -> I */}
      <motion.div
        animate={{
          rotate: [0, 4, -4, 0],
          y: [0, -12, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center"
      >
        {/* Layer 1: The 'U' sweeping base */}
        <motion.div
          animate={{
            scale: [1, 1.04, 1],
            rotate: [0, 8, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-4 rounded-[42%] border-2 border-white/80 bg-gradient-to-br from-white/70 via-[#EBF3FA]/60 to-[#D5E7F7]/30 shadow-uxi-lg backdrop-blur-md"
        />

        {/* Layer 2: The 'X' diagonal crystalline facet */}
        <motion.div
          animate={{
            rotate: [45, 52, 45],
            scale: [0.95, 1.02, 0.95],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute w-44 h-44 rounded-3xl border border-white/90 bg-gradient-to-tr from-white/80 via-[#D5E7F7]/40 to-[#2C72B2]/25 shadow-uxi-md backdrop-blur-lg"
        />

        {/* Layer 3: The 'I' luminous core axis */}
        <motion.div
          animate={{
            y: [-6, 6, -6],
            opacity: [0.85, 1, 0.85],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-12 h-48 rounded-full bg-gradient-to-b from-white/90 via-[#2C72B2]/50 to-[#1D68BD]/30 border border-white/80 shadow-uxi-glow blur-[0.5px]"
        />

        {/* Specular light highlight */}
        <div className="absolute top-10 left-12 w-20 h-10 rounded-full bg-white/70 blur-sm rotate-[-25deg]" />
      </motion.div>
    </div>
  );
}
