"use client";

import React from "react";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

interface TestimonialItem {
  _id?: string;
  name: string;
  role: string;
  company: string;
  quote: string;
}

interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[];
}

export default function TestimonialsSection({
  testimonials = [],
}: TestimonialsSectionProps) {
  const hasVerifiedTestimonials = testimonials && testimonials.length > 0;

  return (
    <section className="py-24 sm:py-32 bg-[#FAFAF8] border-y border-[#EAEAE7] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-4 mb-16 text-center max-w-2xl mx-auto">
          <Badge variant="blue">14 — Client Trust</Badge>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#171717]">
            VERIFIED VOICES.
          </h2>
          <p className="text-sm sm:text-base text-[#6F6F6F]">
            Authentic partnerships. We build long-term relationships through technical excellence and transparent execution.
          </p>
        </div>

        {hasVerifiedTestimonials ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div
                key={t._id || t.name}
                className="p-6 sm:p-10 rounded-3xl bg-white border border-[#EAEAE7] shadow-uxi-sm space-y-6 flex flex-col justify-between"
              >
                <blockquote className="text-base sm:text-xl font-tech font-medium text-[#171717] leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="pt-4 border-t border-[#EAEAE7] flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#171717]">{t.name}</p>
                    <p className="text-xs text-[#6F6F6F]">
                      {t.role} · {t.company}
                    </p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#2C72B2]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 sm:p-14 rounded-3xl bg-white border border-[#EAEAE7] shadow-uxi-sm text-center max-w-2xl mx-auto space-y-6">
            <blockquote className="text-lg sm:text-2xl font-tech font-medium text-[#171717] leading-relaxed">
              &ldquo;We measure success by software uptime, pipeline conversion velocity, and client partnership longevity.&rdquo;
            </blockquote>

            <p className="text-xs text-[#6F6F6F] max-w-md mx-auto">
              Client case reviews and verified partner testimonials are populated directly from our production database upon project signoff.
            </p>

            <div className="pt-2">
              <Button href="/contact" variant="primary" size="sm" className="w-full sm:w-auto justify-center">
                BECOME OUR NEXT SUCCESS STORY
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
