"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import {
  Layers,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  X,
  Star,
} from "lucide-react";

interface ServiceItem {
  _id: string;
  title: string;
  slug: string;
  category: "BUILD" | "INTELLIGENCE" | "SYSTEMS" | "IDENTITY" | "GROWTH" | "EDUCATION";
  tagline: string;
  description: string;
  whatItSolves: string;
  whatUxiBuilds: string;
  capabilities: string[];
  technologies: string[];
  featured: boolean;
  published: boolean;
  order: number;
}

interface ServiceFormData {
  title: string;
  slug: string;
  category: "BUILD" | "INTELLIGENCE" | "SYSTEMS" | "IDENTITY" | "GROWTH" | "EDUCATION";
  tagline: string;
  description: string;
  whatItSolves: string;
  whatUxiBuilds: string;
  capabilities: string;
  technologies: string;
  featured: boolean;
  published: boolean;
  order: number;
}

const emptyForm: ServiceFormData = {
  title: "",
  slug: "",
  category: "BUILD",
  tagline: "",
  description: "",
  whatItSolves: "",
  whatUxiBuilds: "",
  capabilities: "",
  technologies: "",
  featured: false,
  published: true,
  order: 0,
};

const categories = ["ALL", "BUILD", "INTELLIGENCE", "SYSTEMS", "IDENTITY", "GROWTH", "EDUCATION"];

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<ServiceItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      if (data.success) {
        setServices(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenCreate = () => {
    setEditingService(null);
    setFormData(emptyForm);
    setFormError("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv: ServiceItem) => {
    setEditingService(srv);
    setFormData({
      title: srv.title,
      slug: srv.slug,
      category: srv.category,
      tagline: srv.tagline,
      description: srv.description,
      whatItSolves: srv.whatItSolves,
      whatUxiBuilds: srv.whatUxiBuilds,
      capabilities: srv.capabilities?.join(", ") || "",
      technologies: srv.technologies?.join(", ") || "",
      featured: srv.featured,
      published: srv.published,
      order: srv.order || 0,
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    if (!editingService) {
      const autoSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-");
      setFormData((prev) => ({ ...prev, title: val, slug: autoSlug }));
    } else {
      setFormData((prev) => ({ ...prev, title: val }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSaving(true);

    try {
      const payload = {
        ...formData,
        order: Number(formData.order),
        capabilities: formData.capabilities.split(",").map((s) => s.trim()).filter(Boolean),
        technologies: formData.technologies.split(",").map((s) => s.trim()).filter(Boolean),
      };

      const url = "/api/admin/services";
      const method = editingService ? "PUT" : "POST";
      const body = editingService ? { ...payload, id: editingService._id } : payload;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save service");
      }

      setIsModalOpen(false);
      fetchServices();
    } catch (err: any) {
      setFormError(err.message || "Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublished = async (srv: ServiceItem) => {
    try {
      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: srv._id, published: !srv.published }),
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) =>
          prev.map((s) => (s._id === srv._id ? { ...s, published: !s.published } : s))
        );
      }
    } catch (err) {
      console.error("Failed to toggle publish status:", err);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/services?id=${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) => prev.filter((s) => s._id !== deleteTarget._id));
        setDeleteTarget(null);
      }
    } catch (err) {
      console.error("Failed to delete service:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredServices = services.filter((s) => {
    const matchesCategory =
      activeCategory === "ALL" || s.category === activeCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.tagline.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAEAE7]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="blue">SYSTEMS & DISCIPLINES</Badge>
            <span className="text-xs font-mono text-[#8E8E8E]">Capabilities CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight">
            Services & Capabilities
          </h1>
          <p className="text-xs text-[#6F6F6F] mt-1">
            Curate engineering offerings, process architectures, and service detail pages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchServices}
            disabled={loading}
            className="p-2.5 rounded-xl bg-white border border-[#EAEAE7] text-[#171717] hover:bg-[#FAFAF8] transition-colors shadow-xs"
            title="Refresh services"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <Button onClick={handleOpenCreate} size="sm">
            + NEW SERVICE
          </Button>
        </div>
      </div>

      {/* Category Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg uppercase transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[#171717] text-white font-semibold"
                  : "bg-white border border-[#EAEAE7] text-[#6F6F6F] hover:text-[#171717]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#8E8E8E] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search capabilities..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-[#EAEAE7] text-[#171717] placeholder:text-[#8E8E8E] focus:outline-none focus:border-[#2C72B2]"
          />
        </div>
      </div>

      {/* Services List */}
      {loading ? (
        <div className="p-12 text-center text-xs font-mono text-[#8E8E8E] bg-white rounded-2xl border border-[#EAEAE7]">
          Connecting to database and loading services...
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#EAEAE7] space-y-3">
          <Layers className="w-8 h-8 text-[#8E8E8E] mx-auto opacity-50" />
          <p className="text-sm font-bold text-[#171717]">No services found</p>
          <Button onClick={handleOpenCreate} size="sm">
            Create Service
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredServices.map((srv) => (
            <div
              key={srv._id}
              className="p-5 rounded-2xl bg-white border border-[#EAEAE7] shadow-xs hover:border-[#2C72B2]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-base font-bold text-[#171717]">
                    {srv.title}
                  </span>
                  <span className="text-[10px] font-mono text-[#2C72B2] bg-[#EBF3FA] px-2 py-0.5 rounded-md border border-[#D5E7F7] font-semibold">
                    {srv.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#8E8E8E]">
                    Order #{srv.order}
                  </span>
                </div>

                <p className="text-xs text-[#171717] font-medium">
                  {srv.tagline}
                </p>

                <p className="text-xs text-[#6F6F6F] line-clamp-1">
                  {srv.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {srv.capabilities?.slice(0, 4).map((c) => (
                    <span
                      key={c}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717]"
                    >
                      {c}
                    </span>
                  ))}
                  {srv.capabilities?.length > 4 && (
                    <span className="text-[10px] font-mono text-[#8E8E8E] self-center">
                      +{srv.capabilities.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <Link
                  href={`/services/${srv.slug}`}
                  target="_blank"
                  className="p-2 rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#6F6F6F] hover:text-[#171717] hover:border-[#D5E7F7] transition-colors"
                  title="View Public Service Page"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => handleTogglePublished(srv)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
                    srv.published
                      ? "bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]"
                      : "bg-[#FAFAF8] text-[#8E8E8E] border border-[#EAEAE7]"
                  }`}
                  title={srv.published ? "Click to unpublish" : "Click to publish"}
                >
                  {srv.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{srv.published ? "Published" : "Draft"}</span>
                </button>

                <button
                  onClick={() => handleOpenEdit(srv)}
                  className="px-3 py-1.5 rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-xs font-mono text-[#171717] hover:bg-white hover:border-[#2C72B2] transition-colors flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5 text-[#2C72B2]" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => setDeleteTarget(srv)}
                  className="p-2 rounded-xl text-[#8E8E8E] hover:text-[#D92D20] hover:bg-[#FEE4E2]/40 transition-colors"
                  title="Delete Service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#EAEAE7] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#EAEAE7] flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8E8E8E] tracking-wider block">
                  Service Architecture Editor
                </span>
                <h2 className="text-xl font-black text-[#171717] mt-0.5">
                  {editingService ? `Edit: ${editingService.title}` : "Add New Capability"}
                </h2>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-[#8E8E8E] hover:text-[#171717] hover:bg-[#FAFAF8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-[#FEE4E2] border border-[#FECDCA] text-xs text-[#D92D20]">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. AI & Business Automation"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. ai-and-business-automation"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as ServiceItem["category"],
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  >
                    <option value="BUILD">BUILD</option>
                    <option value="INTELLIGENCE">INTELLIGENCE</option>
                    <option value="SYSTEMS">SYSTEMS</option>
                    <option value="IDENTITY">IDENTITY</option>
                    <option value="GROWTH">GROWTH</option>
                    <option value="EDUCATION">EDUCATION</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Tagline *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="High-velocity digital engineering..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                  Full Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed explanation of the capability..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    What It Solves *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.whatItSolves}
                    onChange={(e) => setFormData({ ...formData, whatItSolves: e.target.value })}
                    placeholder="The core operational or commercial bottleneck eliminated..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    What UXI Builds *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.whatUxiBuilds}
                    onChange={(e) => setFormData({ ...formData, whatUxiBuilds: e.target.value })}
                    placeholder="The tangible systems, code, and infrastructure deployed..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Key Capabilities (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.capabilities}
                    onChange={(e) => setFormData({ ...formData, capabilities: e.target.value })}
                    placeholder="Workflow Automation, LLM Fine-Tuning"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="Python, OpenAI, LangChain"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 rounded text-[#2C72B2] focus:ring-[#2C72B2]"
                  />
                  <span className="text-xs font-mono text-[#171717]">
                    Published on live website
                  </span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase text-[#6F6F6F]">
                    Display Order:
                  </span>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-20 px-2.5 py-1 text-xs rounded-lg bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EAEAE7]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-mono rounded-full bg-[#FAFAF8] border border-[#EAEAE7] text-[#6F6F6F] hover:text-[#171717]"
                >
                  Cancel
                </button>

                <Button type="submit" disabled={saving} size="sm">
                  {saving ? "SAVING..." : editingService ? "UPDATE SERVICE" : "CREATE SERVICE"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Service Capability"
        itemName={deleteTarget ? deleteTarget.title : ""}
        message="Are you sure you want to delete this service? It will no longer appear on the public website."
        isDeleting={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
