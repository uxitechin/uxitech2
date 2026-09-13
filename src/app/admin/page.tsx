"use client";

import React, { useState, useEffect } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Lock, CheckCircle2, Clock, Mail, Phone, Building, RefreshCw } from "lucide-react";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  businessName?: string;
  businessType?: string;
  services: string[];
  description: string;
  budget: string;
  timeline: string;
  status: "new" | "reviewed" | "contacted" | "archived";
  createdAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);

  // Authenticate locally using studio security token
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "uxi2026" || passcode === "admin") {
      setIsAuthenticated(true);
      setAuthError("");
      fetchEnquiries();
    } else {
      setAuthError("Invalid administrative passcode. Access denied.");
    }
  };

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/enquiry");
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-40 pb-24 max-w-md mx-auto px-4">
        <div className="p-8 rounded-3xl bg-white border border-[#EAEAE7] shadow-uxi-md text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF3FA] border border-[#D5E7F7] text-[#2C72B2] flex items-center justify-center mx-auto">
            <Lock className="w-5 h-5" />
          </div>

          <div>
            <Badge variant="orange">Restricted Access</Badge>
            <h1 className="text-2xl font-bold text-[#171717] mt-2">
              UXI Studio Admin
            </h1>
            <p className="text-xs text-[#6F6F6F] mt-1">
              Enter administrative security passcode to review database inquiries.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter access code..."
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
              />
              {authError && (
                <p className="text-xs text-[#1D68BD] mt-1">{authError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#171717] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#262626] transition-colors"
            >
              Verify & Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAEAE7]">
        <div>
          <Badge variant="orange">Database Inquiries</Badge>
          <h1 className="text-3xl font-extrabold text-[#171717] mt-1">
            Studio Command Center
          </h1>
          <p className="text-xs text-[#6F6F6F]">
            Connected to MongoDB Atlas: <span className="font-mono text-[#171717]">uxitech</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchEnquiries}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono rounded-full bg-[#FAFAF8] border border-[#EAEAE7] hover:bg-white text-[#171717]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Submissions</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 text-xs font-mono rounded-full bg-[#171717] text-white"
          >
            Lock
          </button>
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-[#6F6F6F]">
            Connecting to MongoDB and fetching records...
          </div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-[#EAEAE7] text-sm text-[#6F6F6F]">
            No inquiries received yet. New submissions will appear here in real-time.
          </div>
        ) : (
          enquiries.map((enq) => (
            <div
              key={enq._id}
              className="p-6 rounded-2xl bg-white border border-[#EAEAE7] shadow-sm space-y-4 hover:border-[#2C72B2]/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EAEAE7]">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-sm font-bold text-[#171717]">
                    {enq.name}
                  </span>
                  {(enq.businessName || enq.company) && (
                    <span className="text-xs text-[#171717] font-semibold flex items-center gap-1 bg-[#FAFAF8] px-2.5 py-0.5 rounded-lg border border-[#EAEAE7]">
                      <Building className="w-3 h-3 text-[#2C72B2]" /> {enq.businessName || enq.company}
                    </span>
                  )}
                  {enq.businessType && (
                    <span className="text-[10px] font-mono text-[#2C72B2] font-semibold bg-[#EBF3FA] px-2 py-0.5 rounded-md border border-[#D5E7F7]">
                      {enq.businessType}
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-[#EBF3FA] text-[10px] font-mono font-bold text-[#2C72B2] border border-[#D5E7F7]">
                    {enq.status.toUpperCase()}
                  </span>
                </div>

                <span className="text-[11px] font-mono text-[#8E8E8E] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(enq.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#6F6F6F]">
                <div>
                  <span className="font-mono text-[#8E8E8E] block">Email:</span>
                  <a
                    href={`mailto:${enq.email}`}
                    className="font-semibold text-[#171717] hover:text-[#2C72B2] flex items-center gap-1 mt-0.5"
                  >
                    <Mail className="w-3 h-3" /> {enq.email}
                  </a>
                </div>
                {enq.phone && (
                  <div>
                    <span className="font-mono text-[#8E8E8E] block">Phone:</span>
                    <a
                      href={`tel:${enq.phone}`}
                      className="font-semibold text-[#171717] hover:text-[#2C72B2] flex items-center gap-1 mt-0.5"
                    >
                      <Phone className="w-3 h-3" /> {enq.phone}
                    </a>
                  </div>
                )}
                <div>
                  <span className="font-mono text-[#8E8E8E] block">Budget & Timeline:</span>
                  <p className="font-semibold text-[#171717] mt-0.5">
                    {enq.budget} · {enq.timeline}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-xs text-[#171717] leading-relaxed">
                <span className="font-mono text-[#8E8E8E] block mb-1">
                  PROJECT BRIEF:
                </span>
                {enq.description}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] font-mono text-[#8E8E8E] self-center mr-1">
                  Requested Capabilities:
                </span>
                {enq.services.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded bg-[#F5F5F3] text-[10px] font-mono text-[#171717]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
