"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  Inbox,
  Briefcase,
  Layers,
  MessageSquareQuote,
  Image as ImageIcon,
  Clock,
  Building,
  Mail,
  Phone,
  RefreshCw,
  PlusCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface DashboardStats {
  enquiries: { total: number; new: number };
  projects: { total: number; published: number };
  services: { total: number; published: number };
  testimonials: { total: number; published: number };
  media: { total: number };
}

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
  status: string;
  createdAt: string;
}

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  new: { bg: "bg-[#EBF3FA]", text: "text-[#2C72B2]", border: "border-[#D5E7F7]" },
  contacted: { bg: "bg-[#FEF6EE]", text: "text-[#C4320A]", border: "border-[#F9DBAF]" },
  in_progress: { bg: "bg-[#F4EBFF]", text: "text-[#7B39ED]", border: "border-[#E9D7FE]" },
  completed: { bg: "bg-[#ECFDF3]", text: "text-[#027A48]", border: "border-[#ABEFC6]" },
  closed: { bg: "bg-[#F5F5F3]", text: "text-[#6F6F6F]", border: "border-[#EAEAE7]" },
  reviewed: { bg: "bg-[#EBF3FA]", text: "text-[#2C72B2]", border: "border-[#D5E7F7]" },
  archived: { bg: "bg-[#F5F5F3]", text: "text-[#6F6F6F]", border: "border-[#EAEAE7]" },
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setRecentEnquiries(data.recentEnquiries || []);
      }
    } catch (err) {
      console.error("Failed to load admin stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleStatusChange = async (enquiryId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: enquiryId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setRecentEnquiries((prev) =>
          prev.map((e) => (e._id === enquiryId ? { ...e, status: newStatus } : e))
        );
        fetchStats();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAEAE7]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="blue">REALTIME OVERVIEW</Badge>
            <span className="text-xs font-mono text-[#8E8E8E]">Studio Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight">
            Administrative Command
          </h1>
          <p className="text-xs text-[#6F6F6F] mt-1">
            System pulse, live inbound inquiries, and digital asset vitality.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#EAEAE7] text-xs font-mono text-[#171717] hover:bg-[#FAFAF8] transition-colors shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Sync Data</span>
          </button>

          <Button href="/admin/projects" size="sm">
            MANAGE PROJECTS
          </Button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Inbound Enquiries */}
        <Link
          href="/admin/enquiries"
          className="p-5 rounded-2xl bg-white border border-[#EAEAE7] shadow-xs hover:border-[#2C72B2]/40 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#6F6F6F]">
              Client Enquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EBF3FA] text-[#2C72B2] flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black text-[#171717]">
              {stats?.enquiries?.total ?? "—"}
            </span>
            {stats?.enquiries?.new ? (
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#EBF3FA] text-[#2C72B2] border border-[#D5E7F7]">
                {stats.enquiries.new} New Leads
              </span>
            ) : (
              <span className="text-[11px] font-mono text-[#8E8E8E]">All clear</span>
            )}
          </div>
        </Link>

        {/* Card 2: Projects */}
        <Link
          href="/admin/projects"
          className="p-5 rounded-2xl bg-white border border-[#EAEAE7] shadow-xs hover:border-[#2C72B2]/40 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#6F6F6F]">
              Active Projects
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] text-[#171717] flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black text-[#171717]">
              {stats?.projects?.total ?? "—"}
            </span>
            <span className="text-[11px] font-mono text-[#027A48]">
              {stats?.projects?.published ?? 0} Published
            </span>
          </div>
        </Link>

        {/* Card 3: Services */}
        <Link
          href="/admin/services"
          className="p-5 rounded-2xl bg-white border border-[#EAEAE7] shadow-xs hover:border-[#2C72B2]/40 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#6F6F6F]">
              Capabilities / Services
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] text-[#171717] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black text-[#171717]">
              {stats?.services?.total ?? "—"}
            </span>
            <span className="text-[11px] font-mono text-[#027A48]">
              {stats?.services?.published ?? 0} Published
            </span>
          </div>
        </Link>

        {/* Card 4: Testimonials */}
        <Link
          href="/admin/testimonials"
          className="p-5 rounded-2xl bg-white border border-[#EAEAE7] shadow-xs hover:border-[#2C72B2]/40 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#6F6F6F]">
              Client Testimonials
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] text-[#171717] flex items-center justify-center">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black text-[#171717]">
              {stats?.testimonials?.total ?? "—"}
            </span>
            <span className="text-[11px] font-mono text-[#027A48]">
              {stats?.testimonials?.published ?? 0} Published
            </span>
          </div>
        </Link>
      </div>

      {/* Quick Launchpad & Fast Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Link
          href="/admin/projects"
          className="p-4 rounded-xl bg-white border border-[#EAEAE7] hover:bg-[#FAFAF8] flex items-center gap-3 transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#171717] text-white flex items-center justify-center">
            <PlusCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#171717] block">
              Add New Project
            </span>
            <span className="text-[11px] text-[#8E8E8E] block">
              Publish case study
            </span>
          </div>
        </Link>

        <Link
          href="/admin/enquiries"
          className="p-4 rounded-xl bg-white border border-[#EAEAE7] hover:bg-[#FAFAF8] flex items-center gap-3 transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#EBF3FA] text-[#2C72B2] flex items-center justify-center">
            <Inbox className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#171717] block">
              Review Enquiries
            </span>
            <span className="text-[11px] text-[#8E8E8E] block">
              Manage client pipeline
            </span>
          </div>
        </Link>

        <Link
          href="/admin/content"
          className="p-4 rounded-xl bg-white border border-[#EAEAE7] hover:bg-[#FAFAF8] flex items-center gap-3 transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] text-[#171717] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#171717] block">
              Edit Site Content
            </span>
            <span className="text-[11px] text-[#8E8E8E] block">
              Hero, founder & CTA copy
            </span>
          </div>
        </Link>

        <Link
          href="/admin/media"
          className="p-4 rounded-xl bg-white border border-[#EAEAE7] hover:bg-[#FAFAF8] flex items-center gap-3 transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] text-[#171717] flex items-center justify-center">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#171717] block">
              Media Assets
            </span>
            <span className="text-[11px] text-[#8E8E8E] block">
              Upload images & banners
            </span>
          </div>
        </Link>
      </div>

      {/* Recent Enquiries Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#171717]">
              Recent Project Inquiries
            </h2>
            <p className="text-xs text-[#6F6F6F]">
              Live submissions from the interactive project intake wizard
            </p>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs font-mono text-[#2C72B2] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View All Enquiries</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs font-mono text-[#8E8E8E] bg-white rounded-2xl border border-[#EAEAE7]">
            Connecting to database...
          </div>
        ) : recentEnquiries.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-[#8E8E8E] bg-white rounded-2xl border border-[#EAEAE7]">
            No recent inquiries recorded yet.
          </div>
        ) : (
          <div className="space-y-3">
            {recentEnquiries.map((enq) => {
              const statusCfg = statusColors[enq.status] || statusColors.new;

              return (
                <div
                  key={enq._id}
                  className="p-5 rounded-2xl bg-white border border-[#EAEAE7] shadow-xs hover:border-[#2C72B2]/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-[#171717]">
                        {enq.name}
                      </span>
                      {(enq.businessName || enq.company) && (
                        <span className="text-xs font-medium text-[#171717] bg-[#FAFAF8] px-2 py-0.5 rounded-md border border-[#EAEAE7] flex items-center gap-1">
                          <Building className="w-3 h-3 text-[#2C72B2]" />
                          {enq.businessName || enq.company}
                        </span>
                      )}
                      {enq.businessType && (
                        <span className="text-[10px] font-mono text-[#6F6F6F] bg-[#FAFAF8] px-2 py-0.5 rounded-md border border-[#EAEAE7]">
                          {enq.businessType}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#6F6F6F]">
                      <a
                        href={`mailto:${enq.email}`}
                        className="hover:text-[#2C72B2] flex items-center gap-1"
                      >
                        <Mail className="w-3 h-3 text-[#8E8E8E]" /> {enq.email}
                      </a>
                      {enq.phone && (
                        <a
                          href={`tel:${enq.phone}`}
                          className="hover:text-[#2C72B2] flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3 text-[#8E8E8E]" /> {enq.phone}
                        </a>
                      )}
                      <span className="font-mono text-[#8E8E8E] text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-xs text-[#171717] line-clamp-1 italic text-[#6F6F6F]">
                      &ldquo;{enq.description}&rdquo;
                    </p>
                  </div>

                  {/* Actions & Status Control */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <div className="relative">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                        className={`text-[11px] font-mono font-bold uppercase px-3 py-1.5 rounded-xl border appearance-none cursor-pointer focus:outline-none pr-7 ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}
                      >
                        <option value="new">NEW</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="in_progress">IN PROGRESS</option>
                        <option value="completed">COMPLETED</option>
                        <option value="closed">CLOSED</option>
                      </select>
                      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-current text-[8px]">
                        ▼
                      </div>
                    </div>

                    <Link
                      href="/admin/enquiries"
                      className="px-3 py-1.5 rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-xs font-mono text-[#171717] hover:bg-white hover:border-[#2C72B2] transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
