"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LiquidMetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
  arrowDirection?: "up-right" | "down" | "right";
  children: React.ReactNode;
}

export function LiquidMetalButton({
  href,
  variant = "primary",
  size = "md",
  showArrow = true,
  arrowDirection = "up-right",
  className,
  children,
  onClick,
  disabled,
  ...props
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const elementRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const rippleId = useRef(0);

  const handleClick = (e: React.MouseEvent<any>) => {
    if (disabled) return;

    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = { x, y, id: rippleId.current++ };

      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 600);
    }

    onClick?.(e);
  };

  const sizeClasses = {
    sm: "px-3.5 sm:px-4 py-2 text-xs min-h-[36px]",
    md: "px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm min-h-[44px]",
    lg: "px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm min-h-[50px]",
  };

  const isSecondary = variant === "secondary";

  const sharedClasses = cn(
    "group relative inline-flex items-center justify-center rounded-full font-bold tracking-wider uppercase transition-all duration-200 select-none overflow-hidden",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2C72B2] focus-visible:ring-offset-2",
    sizeClasses[size],
    isPressed ? "scale-[0.98] translate-y-0.5" : "scale-100",
    disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
    className
  );

  const innerContent = (
    <>
      {/* 1. Liquid Metal Chrome Refraction Aura (Flows around the edge) */}
      <div className="absolute -inset-[1.5px] rounded-full overflow-hidden pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="animate-liquid-flow absolute -inset-[100%] w-[300%] h-[300%]"
          style={{
            background: isSecondary
              ? "conic-gradient(from 0deg at 50% 50%, #0F172A 0deg, #1E3A8A 50deg, #38BDF8 100deg, #FFFFFF 160deg, #2563EB 220deg, #38BDF8 280deg, #0F172A 360deg)"
              : "conic-gradient(from 0deg at 50% 50%, #171717 0deg, #4B5563 45deg, #FFFFFF 90deg, #38BDF8 135deg, #9CA3AF 180deg, #171717 225deg, #FFFFFF 270deg, #38BDF8 315deg, #171717 360deg)",
          }}
        />
      </div>

      {/* 2. Core Titanium/Obsidian Pill Body */}
      <div
        className={cn(
          "absolute inset-[1.5px] rounded-full transition-colors duration-200 pointer-events-none",
          isSecondary
            ? "bg-gradient-to-b from-[#132030] via-[#0C1520] to-[#050A10]"
            : "bg-gradient-to-b from-[#1F1F1F] via-[#121212] to-[#060606]"
        )}
        style={{
          boxShadow: isPressed
            ? "inset 0px 2px 4px rgba(0, 0, 0, 0.6), inset 0px 1px 2px rgba(0, 0, 0, 0.4)"
            : "inset 0px 1px 1px rgba(255, 255, 255, 0.22), inset 0px -1px 2px rgba(0, 0, 0, 0.6)",
        }}
      />

      {/* 3. Top Specular Glass Reflection Line */}
      <div className="absolute inset-x-4 top-[2.5px] h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

      {/* 4. Click Water/Mercury Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            position: "absolute",
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(56, 189, 248, 0.45) 45%, rgba(255, 255, 255, 0) 75%)",
            pointerEvents: "none",
            animation: "shader-ripple 0.6s ease-out forwards",
            zIndex: 30,
          }}
        />
      ))}

      {/* 5. Typography & Arrow Layer */}
      <span
        className="relative z-20 inline-flex items-center gap-1.5 sm:gap-2 text-[#FFFFFF] font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] transition-transform duration-200"
        style={{
          textShadow: "0px 1px 2px rgba(0, 0, 0, 0.7)",
        }}
      >
        <span>{children}</span>
        {showArrow && (
          <ArrowUpRight
            className={cn(
              "w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#38BDF8] transition-transform duration-200 shrink-0",
              arrowDirection === "down" &&
                "rotate-90 group-hover:translate-y-0.5",
              arrowDirection === "right" &&
                "rotate-45 group-hover:translate-x-0.5",
              arrowDirection === "up-right" &&
                "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            )}
          />
        )}
      </span>
    </>
  );

  const dynamicShadow = isPressed
    ? "0px 0px 0px 1px rgba(0, 0, 0, 0.5), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)"
    : isHovered
    ? "0px 0px 0px 1px rgba(56, 189, 248, 0.35), 0px 12px 24px -4px rgba(44, 114, 178, 0.35), 0px 4px 10px rgba(0, 0, 0, 0.35)"
    : "0px 0px 0px 1px rgba(0, 0, 0, 0.35), 0px 10px 15px -3px rgba(0, 0, 0, 0.25), 0px 4px 6px -2px rgba(0, 0, 0, 0.12)";

  if (href) {
    return (
      <Link
        href={href}
        ref={elementRef as React.Ref<HTMLAnchorElement>}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onClick={handleClick}
        className={sharedClasses}
        style={{ boxShadow: dynamicShadow }}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      ref={elementRef as React.Ref<HTMLButtonElement>}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={handleClick}
      disabled={disabled}
      className={sharedClasses}
      style={{ boxShadow: dynamicShadow }}
      {...props}
    >
      {innerContent}
    </button>
  );
}

export default LiquidMetalButton;
