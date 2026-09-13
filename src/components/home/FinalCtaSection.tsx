"use client";

import React from "react";
import Button from "../ui/Button";
import UxiFlowCanvas from "../3d/UxiFlowCanvas";

export default function FinalCtaSection() {
  return (
    <section className="py-28 sm:py-40 bg-[#FFFFFF] relative overflow-hidden text-center">
      {/* Gentle center radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#2C72B2]/10 via-[#1D68BD]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Floating 3D UXI FLOW Contact Variant */}
        <div className="w-36 h-36 sm:w-56 sm:h-56 mx-auto relative">
          <UxiFlowCanvas variant="contact" />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#2C72B2] font-bold">
            HAVE AN IDEA?
          </p>

          <h2 className="text-4xl sm:text-7xl font-extrabold tracking-tight text-[#171717] leading-[1.0]">
            LET&apos;S BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C72B2] via-[#1D68BD] to-[#2563EB]">
              WHAT&apos;S NEXT.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#6F6F6F] max-w-lg mx-auto">
            Web · App · AI · Software · Brand · Growth
          </p>
        </div>

        <div className="pt-2">
          <Button href="/contact" variant="primary" size="lg" className="w-full sm:w-auto justify-center">
            START A PROJECT
          </Button>
        </div>
      </div>
    </section>
  );
}
