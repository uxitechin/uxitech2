"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";
import UxiLogo from "../ui/UxiLogo";
import Button from "../ui/Button";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "WORK", href: "/work" },
  { label: "SERVICES", href: "/services" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "py-2.5 sm:py-3" : "py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Studio Navigation"
            className="flex items-center justify-between gap-3 sm:gap-4"
          >
            {/* Left Capsule: Authentic Brand Identity */}
            <Link
              href="/"
              className={`group flex items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/85 backdrop-blur-xl border border-[#EAEAE7] hover:border-[#2C72B2]/50 transition-all duration-200 shadow-uxi-sm hover:shadow-uxi-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2C72B2] shrink-0`}
            >
              <UxiLogo size="sm" />
            </Link>

            {/* Center Segmented Floating Dock (Unique Custom Architecture) */}
            <div
              onMouseLeave={() => setHoveredIdx(null)}
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/85 backdrop-blur-xl border border-[#EAEAE7] shadow-uxi-sm relative"
            >
              {NAV_LINKS.map((link, idx) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    className={`relative px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors duration-200 rounded-full flex items-center gap-1.5 z-10 ${
                      isActive
                        ? "text-[#171717]"
                        : "text-[#6F6F6F] hover:text-[#171717]"
                    }`}
                  >
                    {/* Active Route Gliding Capsule */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute inset-0 bg-[#F5F5F3] border border-[#EAEAE7] rounded-full -z-10 shadow-xs"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}

                    {/* Fluid Hover Halo */}
                    {hoveredIdx === idx && !isActive && (
                      <motion.div
                        layoutId="hoverNavTab"
                        className="absolute inset-0 bg-[#EBF3FA]/80 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}

                    {/* Active Accent Dot */}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#2C72B2] to-[#1D68BD] shrink-0" />
                    )}

                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right Capsule: Studio Availability & Magnetic CTA */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Primary Launch Action */}
              <Button
                href="/contact"
                variant="primary"
                size="sm"
                className="shrink-0"
              >
                <span className="hidden sm:inline">START A PROJECT</span>
                <span className="sm:hidden text-[11px]">PROJECT</span>
              </Button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
                className="md:hidden p-2 sm:p-2.5 text-[#171717] bg-white/90 border border-[#EAEAE7] rounded-full shadow-sm hover:bg-[#F5F5F3] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2C72B2] shrink-0"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Full-screen Light Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-[#FFFDF9] flex flex-col justify-between pt-24 pb-8 px-6 sm:px-8 md:hidden overflow-y-auto"
          >
            {/* Ambient subtle blue atmosphere */}
            <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-bl from-[#2C72B2]/12 via-[#1D68BD]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between border-b border-[#EAEAE7] pb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#6F6F6F]">
                  Navigation
                </span>
                <span className="text-[11px] font-bold tracking-widest text-[#171717] uppercase">
                  UXI TECH
                </span>
              </div>

              {NAV_LINKS.map((link, idx) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-baseline justify-between text-3xl font-extrabold tracking-tight transition-colors py-1 ${
                        isActive
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-[#2C72B2] to-[#1D68BD]"
                          : "text-[#171717] hover:text-[#2C72B2]"
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="text-xs font-sans text-[#8E8E8E] font-medium">
                        0{idx + 1}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="space-y-6 pt-8 border-t border-[#EAEAE7]">
              <div>
                <p className="text-xs text-[#6F6F6F] mb-1 font-semibold">Direct Inquiry</p>
                <a
                  href="mailto:contact@uxitech.in"
                  className="text-base font-bold text-[#171717] hover:text-[#2C72B2] transition-colors"
                >
                  contact@uxitech.in
                </a>
              </div>
              <Button
                href="/contact"
                variant="primary"
                size="md"
                className="w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                START A PROJECT
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
