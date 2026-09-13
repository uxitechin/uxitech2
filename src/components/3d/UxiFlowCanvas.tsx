"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import UxiFlowFallback from "./UxiFlowFallback";

function isWebGLAvailable() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
}

const DynamicFlowScene = dynamic(() => import("./FlowScene"), {
  ssr: false,
  loading: () => <UxiFlowFallback />,
});

interface UxiFlowCanvasProps {
  className?: string;
  variant?: "hero" | "statement" | "ecosystem" | "contact";
  mode?: "core" | "ai" | "growth";
}

export default function UxiFlowCanvas({
  className = "w-full h-full min-h-[360px] sm:min-h-[500px]",
  variant = "hero",
  mode = "core",
}: UxiFlowCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    setMounted(true);
    setWebGLSupported(isWebGLAvailable());
  }, []);

  if (!mounted || !webGLSupported) {
    return <UxiFlowFallback className={className} variant={variant} />;
  }

  return (
    <div className={`relative ${className}`}>
      <DynamicFlowScene variant={variant} mode={mode} />
    </div>
  );
}
