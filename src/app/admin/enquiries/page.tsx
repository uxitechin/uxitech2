"use client";

import React, { useState, useEffect, useCallback } from "react";
import Badge from "@/components/ui/Badge";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import {
  Inbox,
  Search,
  RefreshCw,
  Mail,
  Phone,
  Building,
  Clock,
  ExternalLink,
  Trash2,
  CheckCircle2,
  Copy,
  X,
  Briefcase,
  Calendar,
  DollarSign,
} from "lucide-react";

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

const filterTabs = [
  { label: "All Enquiries", value: "all" },
  { label: "New Leads", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Closed", value: "closed" },
];

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [activeEnquiry, setActiveEnquiry] = useState<Enquiry | null>(null);
  const [copied, setCopied] = useState(false);

  // Deletion modal state
  const [deleteTarget, setDeleteTarget] = useState<Enquiry | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (selectedStatus && selectedStatus !== "all") {
        params.set("status", selectedStatus);
      }
      params.set("limit", "100");

      const res = await fetch(`/api/admin/enquiries?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    } finally {
      setLoading(false);
    }
  }, [search, selectedStatus]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const handleStatusChange = async (enquiryId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: enquiryId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e._id === enquiryId ? { ...e, status: newStatus } : e))
        );
        if (activeEnquiry?._id === enquiryId) {
          setActiveEnquiry((prev) => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/enquiries?id=${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) => prev.filter((e) => e._id !== deleteTarget._id));
        if (activeEnquiry?._id === deleteTarget._id) {
          setActiveEnquiry(null);
        }
        setDeleteTarget(null);
      }
    } catch (err) {
      console.error("Failed to delete enquiry:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const copyDetailsToClipboard = (enq: Enquiry) => {
    const text = `
UXI TECH Inbound Enquiry:
Client: ${enq.name}
Email: ${enq.email}
Phone: ${enq.phone || "N/A"}
Business: ${enq.businessName || enq.company || "N/A"} (${enq.businessType || "N/A"})
Budget: ${enq.budget}
Timeline: ${enq.timeline}
Services: ${enq.services.join(", ")}
Brief:
${enq.description}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAEAE7]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="blue">INBOUND PIPELINE</Badge>
            <span className="text-xs font-mono text-[#8E8E8E]">Client Acquisition</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight">
            Client Enquiries
          </h1>
          <p className="text-xs text-[#6F6F6F] mt-1">
            Review submissions, track qualification stages, and follow up directly.
          </p>
        </div>

        <button
          onClick={fetchEnquiries}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#EAEAE7] text-xs font-mono text-[#171717] hover:bg-[#FAFAF8] transition-colors shadow-xs self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedStatus(tab.value)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors whitespace-nowrap ${
                selectedStatus === tab.value
                  ? "bg-[#171717] text-white font-semibold"
                  : "bg-white border border-[#EAEAE7] text-[#6F6F6F] hover:text-[#171717]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#8E8E8E] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads, email, company..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-[#EAEAE7] text-[#171717] placeholder:text-[#8E8E8E] focus:outline-none focus:border-[#2C72B2]"
          />
        </div>
      </div>

      {/* Enquiries List */}
      {loading ? (
        <div className="p-12 text-center text-xs font-mono text-[#8E8E8E] bg-white rounded-2xl border border-[#EAEAE7]">
          Querying incoming enquiries database...
        </div>
      ) : enquiries.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#EAEAE7] space-y-2">
          <Inbox className="w-8 h-8 text-[#8E8E8E] mx-auto opacity-50" />
          <p className="text-sm font-bold text-[#171717]">No enquiries found</p>
          <p className="text-xs text-[#6F6F6F]">
            {search || selectedStatus !== "all"
              ? "Try adjusting your search criteria or status filter."
              : "Submissions from the public project intake wizard will arrive here in real-time."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {enquiries.map((enq) => {
            const statusCfg = statusColors[enq.status] || statusColors.new;

            return (
              <div
                key={enq._id}
                onClick={() => setActiveEnquiry(enq)}
                className="p-5 rounded-2xl bg-white border border-[#EAEAE7] shadow-xs hover:border-[#2C72B2] transition-all cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 group"
              >
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-sm font-bold text-[#171717] group-hover:text-[#2C72B2] transition-colors">
                      {enq.name}
                    </span>
                    {(enq.businessName || enq.company) && (
                      <span className="text-xs font-semibold text-[#171717] bg-[#FAFAF8] px-2.5 py-0.5 rounded-lg border border-[#EAEAE7] flex items-center gap-1">
                        <Building className="w-3 h-3 text-[#2C72B2]" />
                        {enq.businessName || enq.company}
                      </span>
                    )}
                    {enq.businessType && (
                      <span className="text-[10px] font-mono text-[#2C72B2] bg-[#EBF3FA] px-2 py-0.5 rounded-md border border-[#D5E7F7]">
                        {enq.businessType}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#6F6F6F]">
                    <span className="flex items-center gap-1 text-[#171717]">
                      <Mail className="w-3.5 h-3.5 text-[#8E8E8E]" /> {enq.email}
                    </span>
                    {enq.phone && (
                      <span className="flex items-center gap-1 text-[#171717]">
                        <Phone className="w-3.5 h-3.5 text-[#8E8E8E]" /> {enq.phone}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-[#8E8E8E] font-mono text-[11px]">
                      <Clock className="w-3 h-3" />
                      {new Date(enq.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-xs text-[#6F6F6F] line-clamp-2 italic">
                    &ldquo;{enq.description}&rdquo;
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {enq.services.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Status Picker & Actions */}
                <div
                  className="flex items-center gap-3 shrink-0 self-end lg:self-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative">
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                      className={`text-xs font-mono font-bold uppercase px-3 py-1.5 rounded-xl border appearance-none cursor-pointer focus:outline-none pr-7 ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}
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

                  <button
                    onClick={() => setActiveEnquiry(enq)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-xs font-mono font-medium text-[#171717] hover:bg-white hover:border-[#2C72B2] transition-colors"
                  >
                    Review
                  </button>

                  <button
                    onClick={() => setDeleteTarget(enq)}
                    className="p-2 rounded-xl text-[#8E8E8E] hover:text-[#D92D20] hover:bg-[#FEE4E2]/40 transition-colors"
                    title="Delete Enquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details Drawer / Modal */}
      {activeEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#EAEAE7] flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8E8E8E] tracking-wider block">
                  Lead Intelligence Dossier
                </span>
                <h2 className="text-xl font-black text-[#171717] mt-0.5">
                  {activeEnquiry.name}
                </h2>
              </div>

              <button
                onClick={() => setActiveEnquiry(null)}
                className="p-2 rounded-xl text-[#8E8E8E] hover:text-[#171717] hover:bg-[#FAFAF8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 space-y-6 flex-1">
              {/* Status Bar */}
              <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#EAEAE7] flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-[#8E8E8E] block">
                    Current Pipeline Status
                  </span>
                  <span
                    className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase ${
                      statusColors[activeEnquiry.status]?.bg
                    } ${statusColors[activeEnquiry.status]?.text}`}
                  >
                    {activeEnquiry.status.replace("_", " ")}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {["new", "contacted", "in_progress", "completed", "closed"].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(activeEnquiry._id, s)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-mono uppercase font-semibold transition-colors ${
                        activeEnquiry.status === s
                          ? "bg-[#171717] text-white"
                          : "bg-white border border-[#EAEAE7] text-[#6F6F6F] hover:text-[#171717]"
                      }`}
                    >
                      {s.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#8E8E8E]">
                  Contact & Organization
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-white border border-[#EAEAE7]">
                    <span className="text-[11px] font-mono text-[#8E8E8E] block">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${activeEnquiry.email}`}
                      className="text-xs font-bold text-[#171717] hover:text-[#2C72B2] flex items-center gap-1.5 mt-1"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#2C72B2]" />
                      {activeEnquiry.email}
                    </a>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#EAEAE7]">
                    <span className="text-[11px] font-mono text-[#8E8E8E] block">
                      Phone Number
                    </span>
                    {activeEnquiry.phone ? (
                      <a
                        href={`tel:${activeEnquiry.phone}`}
                        className="text-xs font-bold text-[#171717] hover:text-[#2C72B2] flex items-center gap-1.5 mt-1"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#2C72B2]" />
                        {activeEnquiry.phone}
                      </a>
                    ) : (
                      <span className="text-xs text-[#8E8E8E] mt-1 block">
                        Not provided
                      </span>
                    )}
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#EAEAE7]">
                    <span className="text-[11px] font-mono text-[#8E8E8E] block">
                      Business Name
                    </span>
                    <span className="text-xs font-bold text-[#171717] flex items-center gap-1.5 mt-1">
                      <Building className="w-3.5 h-3.5 text-[#2C72B2]" />
                      {activeEnquiry.businessName || activeEnquiry.company || "Not specified"}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#EAEAE7]">
                    <span className="text-[11px] font-mono text-[#8E8E8E] block">
                      Business Type
                    </span>
                    <span className="text-xs font-bold text-[#171717] flex items-center gap-1.5 mt-1">
                      <Briefcase className="w-3.5 h-3.5 text-[#2C72B2]" />
                      {activeEnquiry.businessType || "General / Enterprise"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Scope & Parameters */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#8E8E8E]">
                  Project Parameters
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-white border border-[#EAEAE7]">
                    <span className="text-[11px] font-mono text-[#8E8E8E] block flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-[#2C72B2]" /> Budget Tier
                    </span>
                    <p className="text-xs font-bold text-[#171717] mt-1">
                      {activeEnquiry.budget}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#EAEAE7]">
                    <span className="text-[11px] font-mono text-[#8E8E8E] block flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#2C72B2]" /> Target Timeline
                    </span>
                    <p className="text-xs font-bold text-[#171717] mt-1">
                      {activeEnquiry.timeline}
                    </p>
                  </div>
                </div>
              </div>

              {/* Capabilities Requested */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#8E8E8E]">
                  Requested Disciplines
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeEnquiry.services.map((srv) => (
                    <span
                      key={srv}
                      className="px-3 py-1 rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-xs font-mono text-[#171717]"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Brief */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#8E8E8E]">
                  Project Description & Requirements
                </h3>
                <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#EAEAE7] text-xs leading-relaxed text-[#171717] whitespace-pre-wrap">
                  {activeEnquiry.description}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-6 border-t border-[#EAEAE7] bg-white flex flex-wrap items-center justify-between gap-3 sticky bottom-0">
              <button
                onClick={() => copyDetailsToClipboard(activeEnquiry)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-xs font-mono text-[#171717] hover:bg-white transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#027A48]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#6F6F6F]" />
                    <span>Copy Lead Details</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${activeEnquiry.email}?subject=Regarding your inquiry with UXI TECH`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#171717] text-white text-xs font-mono font-bold hover:bg-[#262626] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>

                {activeEnquiry.phone && (
                  <a
                    href={`tel:${activeEnquiry.phone}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2C72B2] text-white text-xs font-mono font-bold hover:bg-[#245D91] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Inbound Enquiry"
        itemName={deleteTarget ? `${deleteTarget.name} (${deleteTarget.email})` : ""}
        message="Are you sure you want to delete this enquiry? This action cannot be reversed."
        isDeleting={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
