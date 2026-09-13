"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface UxiFlowMeshProps {
  variant?: "hero" | "statement" | "ecosystem" | "contact";
  mode?: "core" | "ai" | "growth";
}

// Helper to create a smooth 3D 'U' tube curve
function createUCurve(): THREE.CatmullRomCurve3 {
  const points = [
    new THREE.Vector3(-0.95, 0.85, 0),
    new THREE.Vector3(-0.95, -0.2, 0.1),
    new THREE.Vector3(-0.55, -0.9, 0),
    new THREE.Vector3(0, -1.05, -0.1),
    new THREE.Vector3(0.55, -0.9, 0),
    new THREE.Vector3(0.95, -0.2, 0.1),
    new THREE.Vector3(0.95, 0.85, 0),
  ];
  return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.5);
}

export default function UxiFlowMesh({
  variant = "hero",
  mode = "core",
}: UxiFlowMeshProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const uShapeRef = useRef<THREE.Mesh>(null);
  const xGroupRef = useRef<THREE.Group>(null);
  const iMeshRef = useRef<THREE.Mesh>(null);
  const orbitRingRef = useRef<THREE.Group>(null);
  const innerLightRef = useRef<THREE.PointLight>(null);
  const secondaryLightRef = useRef<THREE.PointLight>(null);

  // Curves & Geometries
  const uCurve = useMemo(() => createUCurve(), []);
  const uGeometry = useMemo(
    () => new THREE.TubeGeometry(uCurve, 72, 0.18, 20, false),
    [uCurve]
  );

  // Digital Ecosystem Node Coordinates on Orbit Ring
  const orbitNodes = useMemo(() => {
    const nodes = [];
    const count = 5;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.9;
      nodes.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * 0.45,
        z: Math.sin(angle) * radius,
        label: i === 0 ? "WEB" : i === 1 ? "AI" : i === 2 ? "CRM" : i === 3 ? "APP" : "GROWTH",
      });
    }
    return nodes;
  }, []);

  // Mode speeds and colors
  const modeSettings = useMemo(() => {
    switch (mode) {
      case "ai":
        return {
          speedMult: 1.6,
          coreColor: "#1D68BD",
          accentColor: "#38BDF8",
          lightIntensity: 4.0,
        };
      case "growth":
        return {
          speedMult: 1.8,
          coreColor: "#2563EB",
          accentColor: "#60A5FA",
          lightIntensity: 4.2,
        };
      case "core":
      default:
        return {
          speedMult: 1.0,
          coreColor: "#2C72B2",
          accentColor: "#38BDF8",
          lightIntensity: 3.4,
        };
    }
  }, [mode]);

  useFrame((state, delta) => {
    if (!rootGroupRef.current) return;
    const t = state.clock.getElapsedTime();
    const mult = modeSettings.speedMult;

    // Gentle global floating & smooth primary rotation
    rootGroupRef.current.position.y = Math.sin(t * 1.2) * 0.1;
    rootGroupRef.current.rotation.y += 0.007 * mult;

    // Interactive pointer response
    const targetX = (state.pointer.y * Math.PI) / 9;
    const targetY = (state.pointer.x * Math.PI) / 7;
    rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      rootGroupRef.current.rotation.x,
      targetX,
      0.05
    );

    // Independent gentle kinetics for each brand letter element:
    // 1. The 'U' foundation gently sways
    if (uShapeRef.current) {
      uShapeRef.current.rotation.z = Math.sin(t * 0.8) * 0.04;
    }

    // 2. The 'X' crossing element counter-rotates slightly
    if (xGroupRef.current) {
      xGroupRef.current.rotation.y = Math.sin(t * 0.9) * 0.15;
      xGroupRef.current.rotation.z = Math.cos(t * 0.7) * 0.05;
    }

    // 3. The 'I' core axis pulses gently
    if (iMeshRef.current) {
      iMeshRef.current.position.y = Math.sin(t * 1.4) * 0.08;
    }

    // 4. Orbit ring rotates continuously
    if (orbitRingRef.current) {
      orbitRingRef.current.rotation.y += 0.015 * mult;
      orbitRingRef.current.rotation.z = Math.sin(t * 0.6) * 0.12;
    }

    // Dynamic light pulsing
    if (innerLightRef.current) {
      innerLightRef.current.intensity =
        modeSettings.lightIntensity + Math.sin(t * 2.2) * 0.8;
    }
  });

  return (
    <group ref={rootGroupRef} scale={variant === "contact" ? 0.85 : 1.12}>
      {/* Dynamic Internal UXI Lighting */}
      <pointLight
        ref={innerLightRef}
        color={modeSettings.coreColor}
        intensity={3.2}
        distance={7}
        decay={2}
        position={[0, 0.1, 0.2]}
      />
      <pointLight
        ref={secondaryLightRef}
        color={modeSettings.accentColor}
        intensity={2.2}
        distance={6}
        decay={2}
        position={[1.2, 0.8, -0.6]}
      />

      {/* =================================================== */}
      {/* 1. BRAND ELEMENT "U": Sweeping Frosted Base Cradle */}
      {/* =================================================== */}
      <mesh ref={uShapeRef} geometry={uGeometry} position={[0, -0.15, 0]}>
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.12}
          metalness={0.04}
          transmission={0.94}
          ior={1.48}
          thickness={1.4}
          specularIntensity={1.0}
          specularColor="#FFFFFF"
          clearcoat={0.9}
          clearcoatRoughness={0.08}
          transparent
          opacity={0.96}
        />
      </mesh>

      {/* =================================================== */}
      {/* 2. BRAND ELEMENT "X": Intersecting Radiant Prisms */}
      {/* =================================================== */}
      <group ref={xGroupRef} position={[0, 0.15, 0]}>
        {/* Diagonal Arm 1 */}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.13, 0.13, 1.7, 24]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            roughness={0.1}
            metalness={0.05}
            transmission={0.92}
            ior={1.52}
            thickness={1.6}
            specularIntensity={1.0}
            clearcoat={1.0}
            clearcoatRoughness={0.06}
            transparent
            opacity={0.94}
          />
        </mesh>

        {/* Diagonal Arm 2 */}
        <mesh rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.13, 0.13, 1.7, 24]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            roughness={0.1}
            metalness={0.05}
            transmission={0.92}
            ior={1.52}
            thickness={1.6}
            specularIntensity={1.0}
            clearcoat={1.0}
            clearcoatRoughness={0.06}
            transparent
            opacity={0.94}
          />
        </mesh>

        {/* Central Luminous Core Jewel */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshPhysicalMaterial
            color={modeSettings.coreColor}
            roughness={0.18}
            transmission={0.82}
            ior={1.6}
            thickness={2.0}
            emissive={modeSettings.coreColor}
            emissiveIntensity={0.6}
            transparent
            opacity={0.92}
          />
        </mesh>
      </group>

      {/* =================================================== */}
      {/* 3. BRAND ELEMENT "I": Vertical Luminous Pillar Beacon */}
      {/* =================================================== */}
      <mesh ref={iMeshRef} position={[0, 0.2, 0.1]}>
        <cylinderGeometry args={[0.09, 0.09, 2.1, 24]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.08}
          metalness={0.06}
          transmission={0.96}
          ior={1.5}
          thickness={1.5}
          specularIntensity={1.0}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Top Beacon Accent Node of 'I' */}
      <mesh position={[0, 1.3, 0.1]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial
          color={modeSettings.accentColor}
          emissive={modeSettings.accentColor}
          emissiveIntensity={1.2}
          roughness={0.2}
        />
      </mesh>

      {/* =================================================== */}
      {/* 4. ECOSYSTEM ORBIT: Gyroscopic Ring with System Nodes */}
      {/* =================================================== */}
      <group ref={orbitRingRef} rotation={[Math.PI / 3.8, 0, Math.PI / 7]}>
        {/* Orbital Halo Path */}
        <mesh>
          <torusGeometry args={[1.9, 0.014, 16, 100]} />
          <meshStandardMaterial
            color="#D5E7F7"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.65}
          />
        </mesh>

        {/* Orbiting Capability Nodes (Web, AI, CRM, App, Growth) */}
        {orbitNodes.map((node, i) => (
          <mesh key={node.label} position={[node.x, node.y, node.z]}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#2C72B2" : "#38BDF8"}
              emissive={i % 2 === 0 ? "#2C72B2" : "#38BDF8"}
              emissiveIntensity={0.8}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
