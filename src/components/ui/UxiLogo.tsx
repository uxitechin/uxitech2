"use client";

import React from "react";

interface UxiLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  inverted?: boolean;
}

export default function UxiLogo({
  className = "",
  size = "md",
  showTagline = false,
  inverted = false,
}: UxiLogoProps) {
  const sizeMap = {
    sm: {
      uxiText: "text-xl sm:text-2xl",
      dividerHeight: "h-3.5 sm:h-4",
      techText: "text-[10px] sm:text-[11px]",
      dotSize: "w-1.5 h-1.5",
      taglineText: "text-[8px] sm:text-[9px]",
    },
    md: {
      uxiText: "text-2xl sm:text-3xl",
      dividerHeight: "h-4 sm:h-5",
      techText: "text-xs",
      dotSize: "w-1.5 h-1.5",
      taglineText: "text-[10px]",
    },
    lg: {
      uxiText: "text-4xl sm:text-5xl",
      dividerHeight: "h-7 sm:h-8",
      techText: "text-sm",
      dotSize: "w-2 h-2",
      taglineText: "text-xs",
    },
    xl: {
      uxiText: "text-5xl sm:text-7xl",
      dividerHeight: "h-10 sm:h-12",
      techText: "text-base sm:text-lg",
      dotSize: "w-2.5 h-2.5",
      taglineText: "text-sm",
    },
  };

  const currentSize = sizeMap[size];
  const primaryTextColor = inverted ? "text-white" : "text-[#171717]";
  const secondaryTextColor = inverted ? "text-[#D5E7F7]" : "text-[#6F6F6F]";
  const dividerColor = inverted ? "bg-white/25" : "bg-[#EAEAE7]";

  return (
    <div className={`inline-flex flex-col select-none whitespace-nowrap ${className}`}>
      <div className="flex items-center gap-2 sm:gap-2.5 whitespace-nowrap">
        {/* Normal clean brand typography with authentic UXI Blue X */}
        <span
          className={`font-extrabold ${currentSize.uxiText} tracking-tight ${primaryTextColor} flex items-center leading-none`}
        >
          U<span className="text-[#2C72B2] px-[0.5px]">X</span>I
        </span>

        {/* Elegant vertical hairline divider */}
        <div className={`${currentSize.dividerHeight} w-[1px] ${dividerColor} shrink-0`} />

        {/* Unique TECH companion with live status pulse */}
        <span
          className={`inline-flex items-center gap-1.5 ${currentSize.techText} font-bold tracking-[0.2em] ${secondaryTextColor} uppercase leading-none shrink-0`}
        >
          <span className={`${currentSize.dotSize} rounded-full bg-[#2C72B2] animate-pulse shrink-0`} />
          TECH
        </span>
      </div>

      {showTagline && (
        <span
          className={`${currentSize.taglineText} font-bold tracking-[0.24em] text-[#6F6F6F] uppercase pt-1.5`}
        >
          UNIFIED · XPERIENCE · INTELLIGENCE
        </span>
      )}
    </div>
  );
}
