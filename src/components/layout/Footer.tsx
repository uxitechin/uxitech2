import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import UxiLogo from "../ui/UxiLogo";
import Button from "../ui/Button";

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAFAF8] border-t border-[#EAEAE7] text-[#171717] pt-20 pb-12 overflow-hidden relative">
      {/* Soft blue atmosphere */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-t from-[#2C72B2]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#EAEAE7]">
          {/* Brand & Statement */}
          <div className="md:col-span-6 space-y-4">
            <Link href="/" className="inline-block group">
              <UxiLogo size="lg" showTagline />
            </Link>
            <p className="text-lg text-[#171717] font-medium max-w-md">
              Digital solutions for modern businesses.
            </p>
            <p className="text-sm text-[#6F6F6F] max-w-md leading-relaxed">
              We don&apos;t just build websites. We engineer digital systems, automation pipelines, and distinctive brand identities that move businesses forward.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#6F6F6F]">
              Index
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#2C72B2] transition-colors inline-flex items-center gap-1"
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="hover:text-[#2C72B2] transition-colors inline-flex items-center gap-1"
                >
                  WORK
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#2C72B2] transition-colors inline-flex items-center gap-1"
                >
                  SERVICES
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#2C72B2] transition-colors inline-flex items-center gap-1"
                >
                  ABOUT
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#2C72B2] transition-colors inline-flex items-center gap-1"
                >
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Inquiry */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#6F6F6F]">
              Initiate
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:contact@uxitech.in"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#171717] hover:text-[#2C72B2] transition-colors"
              >
                contact@uxitech.in
                <ArrowUpRight className="w-3.5 h-3.5 text-[#2C72B2] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <p className="text-xs text-[#6F6F6F]">
                Bengaluru · Remote Worldwide
              </p>
              <div className="pt-2">
                <Button
                  href="/contact"
                  variant="primary"
                  size="sm"
                >
                  Start A Project
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6F6F6F]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} UXI TECH.</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-tech text-xs tracking-wider uppercase font-semibold text-[#171717]">
              Built with curiosity.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
