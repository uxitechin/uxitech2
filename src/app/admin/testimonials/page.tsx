"use client";

import React, { useState, useEffect } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import {
  MessageSquareQuote,
  RefreshCw,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Building,
  User,
  X,
} from "lucide-react";

interface TestimonialItem {
  _id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  image?: string;
  projectSlug?: string;
  featured: boolean;
  published: boolean;
  order: number;
}

const emptyForm = {
  name: "",
  role: "",
  company: "",
  quote: "",
  projectSlug: "",
  featured: false,
  published: true,
  order: 0,
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<TestimonialItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData(emptyForm);
    setFormError("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: TestimonialItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      role: item.role,
      company: item.company,
      quote: item.quote,
      projectSlug: item.projectSlug || "",
      featured: item.featured,
      published: item.published,
      order: item.order || 0,
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSaving(true);

    try {
      const payload = {
        ...formData,
        order: Number(formData.order),
      };

      const url = "/api/admin/testimonials";
      const method = editingItem ? "PUT" : "POST";
      const body = editingItem ? { ...payload, id: editingItem._id } : payload;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save testimonial");
      }

      setIsModalOpen(false);
      fetchTestimonials();
    } catch (err: any) {
      setFormError(err.message || "Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublished = async (item: TestimonialItem) => {
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item._id, published: !item.published }),
      });
      const data = await res.json();
      if (data.success) {
        setTestimonials((prev) =>
          prev.map((t) => (t._id === item._id ? { ...t, published: !t.published } : t))
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
      const res = await fetch(`/api/admin/testimonials?id=${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setTestimonials((prev) => prev.filter((t) => t._id !== deleteTarget._id));
        setDeleteTarget(null);
      }
    } catch (err) {
      console.error("Failed to delete testimonial:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAEAE7]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="blue">CLIENT ENDORSEMENTS</Badge>
            <span className="text-xs font-mono text-[#8E8E8E]">Social Proof CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight">
            Client Testimonials
          </h1>
          <p className="text-xs text-[#6F6F6F] mt-1">
            Manage executive reviews, verified client quotes, and case study endorsements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchTestimonials}
            disabled={loading}
            className="p-2.5 rounded-xl bg-white border border-[#EAEAE7] text-[#171717] hover:bg-[#FAFAF8] transition-colors shadow-xs"
            title="Refresh testimonials"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <Button onClick={handleOpenCreate} size="sm">
            + ADD TESTIMONIAL
          </Button>
        </div>
      </div>

      {/* Testimonials Grid */}
      {loading ? (
        <div className="p-12 text-center text-xs font-mono text-[#8E8E8E] bg-white rounded-2xl border border-[#EAEAE7]">
          Loading testimonial records...
        </div>
      ) : testimonials.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#EAEAE7] space-y-3">
          <MessageSquareQuote className="w-8 h-8 text-[#8E8E8E] mx-auto opacity-50" />
          <p className="text-sm font-bold text-[#171717]">No testimonials found</p>
          <Button onClick={handleOpenCreate} size="sm">
            Add First Testimonial
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="p-5 rounded-2xl bg-white border border-[#EAEAE7] shadow-xs hover:border-[#2C72B2]/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {t.featured && (
                      <span className="text-[10px] font-mono text-[#C4320A] bg-[#FEF6EE] px-2 py-0.5 rounded-md border border-[#F9DBAF] flex items-center gap-1 font-semibold">
                        <Star className="w-2.5 h-2.5 fill-current" /> Featured
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-[#8E8E8E]">
                      #{t.order}
                    </span>
                  </div>

                  <button
                    onClick={() => handleTogglePublished(t)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 transition-colors ${
                      t.published
                        ? "bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]"
                        : "bg-[#FAFAF8] text-[#8E8E8E] border border-[#EAEAE7]"
                    }`}
                  >
                    {t.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{t.published ? "Published" : "Draft"}</span>
                  </button>
                </div>

                <p className="text-xs text-[#171717] leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#EAEAE7] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#171717]">{t.name}</h4>
                  <p className="text-[11px] text-[#6F6F6F]">
                    {t.role} · <span className="font-semibold text-[#171717]">{t.company}</span>
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="p-1.5 rounded-lg text-[#6F6F6F] hover:text-[#2C72B2] hover:bg-[#EBF3FA] transition-colors"
                    title="Edit Testimonial"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(t)}
                    className="p-1.5 rounded-lg text-[#8E8E8E] hover:text-[#D92D20] hover:bg-[#FEE4E2]/40 transition-colors"
                    title="Delete Testimonial"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#EAEAE7] shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-[#EAEAE7] flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8E8E8E] tracking-wider block">
                  Testimonial Editor
                </span>
                <h2 className="text-xl font-black text-[#171717] mt-0.5">
                  {editingItem ? `Edit Review` : "New Client Endorsement"}
                </h2>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-[#8E8E8E] hover:text-[#171717] hover:bg-[#FAFAF8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-[#FEE4E2] border border-[#FECDCA] text-xs text-[#D92D20]">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                  Client / Executive Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. K. Srinivas"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Director of Operations"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Healthcare"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                  Testimonial Quote *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="The executive feedback or measurable impact statement..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                  Associated Project Slug (Optional)
                </label>
                <input
                  type="text"
                  value={formData.projectSlug}
                  onChange={(e) => setFormData({ ...formData, projectSlug: e.target.value })}
                  placeholder="e.g. wasshot"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                />
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
                    Published on live site
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#2C72B2] focus:ring-[#2C72B2]"
                  />
                  <span className="text-xs font-mono text-[#171717]">
                    Featured display
                  </span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase text-[#6F6F6F]">
                    Order:
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
                  {saving ? "SAVING..." : editingItem ? "UPDATE TESTIMONIAL" : "ADD TESTIMONIAL"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Testimonial"
        itemName={deleteTarget ? `${deleteTarget.name} - ${deleteTarget.company}` : ""}
        message="Are you sure you want to delete this testimonial? It will no longer appear on the website."
        isDeleting={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
