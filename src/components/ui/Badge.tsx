import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "orange" | "coral" | "blue" | "neutral" | "outline";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[#F5F5F3] text-[#171717] border border-[#EAEAE7]",
    blue: "bg-[#EBF3FA] text-[#2C72B2] border border-[#D5E7F7]",
    orange: "bg-[#EBF3FA] text-[#2C72B2] border border-[#D5E7F7]",
    coral: "bg-[#EBF3FA] text-[#1D68BD] border border-[#D5E7F7]",
    neutral: "bg-[#FAFAF8] text-[#6F6F6F] border border-[#EAEAE7]",
    outline: "bg-transparent text-[#6F6F6F] border border-[#EAEAE7]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-sans font-bold uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
