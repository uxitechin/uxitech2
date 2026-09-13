"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import UxiFlowMesh from "./UxiFlowMesh";

interface FlowSceneProps {
  variant?: "hero" | "statement" | "ecosystem" | "contact";
  mode?: "core" | "ai" | "growth";
}

export default function FlowScene({
  variant = "hero",
  mode = "core",
}: FlowSceneProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.6], fov: 44 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
        touchAction: "pan-y",
      }}
    >
      {/* Studio Lighting tailored for white canvas refractive glass */}
      <ambientLight intensity={1.4} />
      <directionalLight position={[6, 9, 6]} intensity={2.0} color="#FFFFFF" />
      <directionalLight position={[-6, -4, 3]} intensity={1.2} color="#EBF3FA" />
      <directionalLight position={[0, -6, -4]} intensity={0.9} color="#D5E7F7" />

      {/* OrbitControls allowing user to gently interactively drag & inspect on desktop */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={!isMobile}
        rotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 3}
      />

      <Suspense fallback={null}>
        <UxiFlowMesh variant={variant} mode={mode} />
      </Suspense>
    </Canvas>
  );
}
