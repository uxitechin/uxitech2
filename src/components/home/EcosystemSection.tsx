"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { ArrowRight } from "lucide-react";

/* ---------------- Authentic Brand SVG Icons ---------------- */

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-label="Google">
      <path
        d="M501.8 261.8c0-18.2-1.6-35.6-4.7-52.4H256v99.1h137.8c-6.1 31.9-24.2 58.9-51.4 77V450h83.1c48.3-44.6 76.3-110.2 76.3-188.2"
        fill="#4285F4"
      />
      <path
        d="M256 512c69.1 0 127.1-22.8 169.4-61.9l-83.1-64.5c-22.8 15.4-51.9 24.7-86.3 24.7-66.6 0-123.1-44.9-143.4-105.4H27.5V371C69.6 454.5 155.9 512 256 512"
        fill="#34A853"
      />
      <path
        d="M112.6 304.6c-5.1-15.4-8.1-31.7-8.1-48.6s3-33.3 8.1-48.6v-66.1H27.5C10 175.7 0 214.6 0 256s10 80.3 27.5 114.7L93.8 319c0 .1 18.8-14.4 18.8-14.4"
        fill="#FBBC05"
      />
      <path
        d="M256 101.9c37.7 0 71.2 13 98 38.2l73.3-73.3C382.8 25.4 325.1 0 256 0 155.9 0 69.6 57.5 27.5 141.3l85.2 66.1c20.2-60.5 76.7-105.5 143.3-105.5"
        fill="#EA4335"
      />
    </svg>
  );
}

function MetaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Meta">
      <defs>
        <linearGradient id="metaGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0064E0" />
          <stop offset="50%" stopColor="#0081FB" />
          <stop offset="100%" stopColor="#0082FB" />
        </linearGradient>
      </defs>
      <path
        fill="url(#metaGrad)"
        d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
      />
    </svg>
  );
}

function FigmaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 300" className={className} aria-label="Figma">
      <path d="M50 300c27.6 0 50-22.4 50-50v-50H50c-27.6 0-50 22.4-50 50s22.4 50 50 50z" fill="#0ACF83" />
      <path d="M0 150c0-27.6 22.4-50 50-50h50v100H50c-27.6 0-50-22.4-50-50z" fill="#A259FF" />
      <path d="M0 50C0 22.4 22.4 0 50 0h50v100H50C22.4 100 0 77.6 0 50z" fill="#F24E1E" />
      <path d="M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z" fill="#FF7262" />
      <path d="M200 150c0 27.6-22.4 50-50 50s-50-22.4-50-50 22.4-50 50-50 50 22.4 50 50z" fill="#1ABCFE" />
    </svg>
  );
}

function OpenAiIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#10A37F" aria-label="OpenAI">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  );
}

function ReactIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} aria-label="React">
      <circle cx="0" cy="0" r="2.05" fill="#00D8FF" />
      <g stroke="#00D8FF" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#171717" aria-label="Apple">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.96c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.6.69-1.12 1.83-.98 2.95 1.07.08 2.13-.53 2.79-1.29z" />
    </svg>
  );
}

function HubSpotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#FF7A59" aria-label="HubSpot">
      <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#24292F" aria-label="GitHub">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function PythonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-label="Python">
      <defs>
        <linearGradient id="pyBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#387EB8" />
          <stop offset="100%" stopColor="#366994" />
        </linearGradient>
        <linearGradient id="pyYellow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE052" />
          <stop offset="100%" stopColor="#FFC331" />
        </linearGradient>
      </defs>
      <path
        d="M253 0c-20.9.1-40.8 1.9-58.4 5-51.7 9.1-61.1 28.2-61.1 63.5V115h122.1v15.5H87.7c-35.5 0-66.6 21.3-76.3 61.9C.2 239-.3 268 11.4 316.6c8.7 36.2 29.4 61.9 64.9 61.9h42v-55.8c0-40.3 34.9-75.9 76.3-75.9h122c34 0 61.1-28 61.1-62.1V68.5c0-33.1-27.9-58-61.1-63.5-21-3.5-42.7-5.1-63.6-5m-66.1 37.4c12.6 0 22.9 10.5 22.9 23.3s-10.3 23.2-22.9 23.2C174.3 84 164 73.6 164 60.8c0-12.9 10.3-23.4 22.9-23.4"
        fill="url(#pyBlue)"
      />
      <path
        d="M392.9 130.6v54.2c0 42.1-35.7 77.4-76.3 77.4h-122c-33.4 0-61.1 28.6-61.1 62.1v116.3c0 33.1 28.8 52.6 61.1 62.1 38.7 11.4 75.7 13.4 122 0 30.8-8.9 61.1-26.8 61.1-62.1V394h-122v-15.5h183.1c35.5 0 48.7-24.8 61.1-61.9 12.8-38.3 12.2-75.1 0-124.1-8.8-35.3-25.5-61.9-61.1-61.9zm-68.6 294.5c12.7 0 22.9 10.4 22.9 23.2 0 12.9-10.3 23.3-22.9 23.3s-22.9-10.5-22.9-23.3 10.3-23.2 22.9-23.2"
        fill="url(#pyYellow)"
      />
    </svg>
  );
}

/* ---------------- Node Data ---------------- */

interface EcosystemNode {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  headline: string;
  description: string;
  pipeline: string[];
  techs: string[];
  outcome: string;
}

const NODES: EcosystemNode[] = [
  {
    id: "web",
    name: "WEB",
    category: "BUILD",
    icon: ReactIcon,
    headline: "High-Performance Web Ecosystems",
    description: "Digital flagships engineered for conversion, sub-second latency, and fluid micro-interactions.",
    pipeline: ["Idea", "UX/UI Architecture", "Next.js Engine", "Performance Audit", "Global Launch"],
    techs: ["Next.js", "TypeScript", "Tailwind CSS", "Three.js"],
    outcome: "Sub-second speed, 90+ lighthouse scores, high buyer conversion.",
  },
  {
    id: "mobile",
    name: "MOBILE",
    category: "BUILD",
    icon: AppleIcon,
    headline: "Tactile Mobile Products",
    description: "Intuitive iOS and Android applications with native ergonomics and offline resilience.",
    pipeline: ["Ergonomic Flow", "Gesture Prototyping", "Native Core", "Push Engine", "Store Release"],
    techs: ["React Native", "Flutter", "iOS", "Android"],
    outcome: "Fluid 60fps animations, instant push engagement, daily retention.",
  },
  {
    id: "ai",
    name: "AI & AUTOMATION",
    category: "INTELLIGENCE",
    icon: OpenAiIcon,
    headline: "Autonomous Business Intelligence",
    description: "Self-executing systems that understand customer intent and automate repetitive operations.",
    pipeline: ["Customer Message", "AI Understanding", "WhatsApp API", "CRM Sync", "Auto Follow-Up", "Analytics"],
    techs: ["Claude/OpenAI", "Meta Cloud API", "LangChain", "Webhooks"],
    outcome: "Zero-latency 24/7 replies, 70% support inquiry auto-resolution.",
  },
  {
    id: "crm",
    name: "CRM",
    category: "INTELLIGENCE",
    icon: HubSpotIcon,
    headline: "Pipeline Velocity Systems",
    description: "Tailored customer relationship command centers that prevent leads from ever falling through the cracks.",
    pipeline: ["Inbound Lead", "Auto-Scoring", "Activity Timeline", "Task Dispatch", "Deal Velocity"],
    techs: ["HubSpot", "MongoDB", "REST APIs", "PostgreSQL"],
    outcome: "Clear deal visibility, automated salesperson alerts, faster closing cycles.",
  },
  {
    id: "software",
    name: "SOFTWARE",
    category: "SYSTEMS",
    icon: GitHubIcon,
    headline: "Custom Management Software",
    description: "Bespoke internal ERPs, dashboards, and operating systems built for your exact workflow.",
    pipeline: ["Operational Audit", "Schema Architecture", "Role-Based UI", "Real-Time Sync", "Deployment"],
    techs: ["React", "Node.js", "Docker", "MongoDB"],
    outcome: "Complete elimination of SaaS subscription bloat and manual data entry.",
  },
  {
    id: "brand",
    name: "BRAND",
    category: "IDENTITY",
    icon: FigmaIcon,
    headline: "Distinctive Visual Identity",
    description: "Modern minimalist identity systems that command authority and unforgettable recognition.",
    pipeline: ["Strategy", "Typographic Core", "Visual System", "Asset Design", "Brand Experience"],
    techs: ["Figma", "Typography", "Vector Systems", "Design Guidelines"],
    outcome: "Premium perceived value, cohesive cross-platform visual authority.",
  },
  {
    id: "ads",
    name: "ADS",
    category: "GROWTH",
    icon: MetaIcon,
    headline: "Precision Paid Acquisition",
    description: "Algorithmic Meta and Google ad campaigns engineered for qualified lead acquisition.",
    pipeline: ["Search Intent Audit", "Creative Hooks", "Landing Funnel", "CAPI Tracking", "ROAS Scaling"],
    techs: ["Google Ads", "Meta Ads", "GA4", "Server-Side CAPI"],
    outcome: "Transparent customer acquisition cost and predictable pipeline volume.",
  },
  {
    id: "seo",
    name: "SEO",
    category: "GROWTH",
    icon: GoogleIcon,
    headline: "Technical Search Authority",
    description: "Code-level optimization and semantic architecture that dominate organic search rankings.",
    pipeline: ["Health Crawl", "Entity Mapping", "Schema Microdata", "Core Web Vitals", "Rank Compounding"],
    techs: ["Google Search Console", "Schema.org", "Semantic HTML", "Sitemaps"],
    outcome: "Compounding high-intent organic traffic that doesn't cost per click.",
  },
  {
    id: "projects",
    name: "PROJECTS",
    category: "EDUCATION",
    icon: PythonIcon,
    headline: "Academic Project Engineering",
    description: "Structured technical prototype development and engineering mentorship.",
    pipeline: ["Research Scope", "System Architecture", "Functional Code", "Live Deployment", "Viva Defense"],
    techs: ["Python", "TensorFlow", "React", "Cloud Deploys"],
    outcome: "Verified functional software prototypes and academic presentation excellence.",
  },
];

export default function EcosystemSection() {
  const [activeNode, setActiveNode] = useState<EcosystemNode>(NODES[2]); // Default to AI
  const ActiveIcon = activeNode.icon;

  return (
    <section id="ecosystem" className="py-24 sm:py-32 bg-[#FFFFFF] relative overflow-hidden">
      {/* Atmosphere glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#2C72B2]/5 via-[#1D68BD]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <Badge variant="blue">02 — UXI Ecosystem</Badge>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#171717]">
              ONE TEAM. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C72B2] to-[#1D68BD]">
                MANY POSSIBILITIES.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6F6F6F] max-w-md">
            Select any capability node below to visualize how UXI connects strategy, code, and automation into a living system.
          </p>
        </div>

        {/* The Interactive Node Grid & Constellation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Orbital Node Selectors */}
          <div className="lg:col-span-5 bg-[#FAFAF8] p-4 sm:p-6 rounded-3xl border border-[#EAEAE7] shadow-uxi-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EAEAE7]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#6F6F6F]">
                Ecosystem Nodes
              </span>
              <span className="text-[11px] font-mono text-[#2C72B2]">
                9 Capabilities Linked
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {NODES.map((node) => {
                const isSelected = activeNode.id === node.id;
                const Icon = node.icon;
                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(node)}
                    className={`relative p-2.5 sm:p-3 rounded-xl sm:rounded-2xl flex flex-col items-center text-center transition-all duration-200 group ${
                      isSelected
                        ? "bg-[#FFFFFF] text-[#171717] shadow-uxi-md border border-[#2C72B2]/40 ring-2 ring-[#2C72B2]/20"
                        : "bg-white/70 hover:bg-white text-[#6F6F6F] hover:text-[#171717] border border-[#EAEAE7]"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center p-2 mb-1.5 sm:mb-2 transition-all duration-200 ${
                        isSelected
                          ? "bg-[#EBF3FA] shadow-xs scale-105"
                          : "bg-[#FAFAF8] group-hover:bg-[#F3F3F0] group-hover:scale-105"
                      }`}
                    >
                      <Icon className="w-full h-full transition-transform duration-200 group-hover:scale-110" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold tracking-tight truncate w-full">
                      {node.name}
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-mono text-[#8E8E8E] uppercase mt-0.5">
                      {node.category}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Central UXI Node Status */}
            <div className="mt-5 p-3.5 sm:p-4 rounded-2xl bg-[#EBF3FA] border border-[#D5E7F7]/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2C72B2] to-[#1D68BD] flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
                  UXI
                </div>
                <div>
                  <p className="text-xs font-bold text-[#171717]">Central Orchestrator</p>
                  <p className="text-[11px] text-[#6F6F6F]">All nodes integrated seamlessly</p>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#2C72B2] animate-ping" />
            </div>
          </div>

          {/* Right Column: Dynamic Live Visual Pipeline Representation */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#FAFAF8] rounded-3xl p-5 sm:p-8 border border-[#EAEAE7] shadow-uxi-md space-y-6"
              >
                {/* Node Title & Description */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAEAE7]">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-[#EAEAE7] shadow-sm flex items-center justify-center shrink-0 p-2.5">
                      <ActiveIcon className="w-full h-full" />
                    </div>
                    <div>
                      <Badge variant="blue" className="mb-1.5">
                        {activeNode.category} · {activeNode.name}
                      </Badge>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                        {activeNode.headline}
                      </h3>
                    </div>
                  </div>
                  <Button
                    href={`/services/${activeNode.id === "web" ? "websites-and-web-applications" : activeNode.id === "ai" ? "ai-and-business-automation" : "mobile-applications"}`}
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto justify-center shrink-0"
                  >
                    View Details
                  </Button>
                </div>

                <p className="text-[#6F6F6F] text-sm sm:text-base leading-relaxed">
                  {activeNode.description}
                </p>

                {/* The Miniature Live Pipeline Workflow */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#6F6F6F]">
                      Active Execution Pipeline
                    </span>
                    <span className="text-[10px] font-mono text-[#2C72B2] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2C72B2] animate-pulse" />
                      Live Flow
                    </span>
                  </div>

                  <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-[#EAEAE7] shadow-uxi-sm overflow-x-auto touch-pan-x">
                    <div className="flex items-center gap-2 min-w-max">
                      {activeNode.pipeline.map((step, idx) => (
                        <React.Fragment key={step}>
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: idx * 0.08, duration: 0.3 }}
                            className="px-3.5 py-2 rounded-xl bg-[#EBF3FA] border border-[#D5E7F7] text-xs font-bold text-[#171717] shadow-sm flex items-center gap-2"
                          >
                            <span className="w-4 h-4 rounded-full bg-[#2C72B2]/20 text-[#2C72B2] flex items-center justify-center text-[10px] font-mono font-bold">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </motion.div>
                          {idx < activeNode.pipeline.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-[#2C72B2] shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Technology & Measurable Outcome */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-[#EAEAE7]">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#6F6F6F] block mb-2">
                      Core Technology
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeNode.techs.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-[#F5F5F3] text-[11px] font-mono font-medium text-[#171717]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#EAEAE7]">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#6F6F6F] block mb-2">
                      Business Outcome
                    </span>
                    <p className="text-xs text-[#171717] font-medium leading-relaxed">
                      {activeNode.outcome}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
