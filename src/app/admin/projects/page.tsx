"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import {
  Briefcase,
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  RefreshCw,
  X,
  Check,
  Save,
} from "lucide-react";

interface ProjectItem {
  _id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  services: string[];
  shortDescription?: string;
  description: string;
  challenge: string;
  solution: string;
  build: string;
  result: string;
  technologies: string[];
  images: string[];
  featured: boolean;
  published: boolean;
  order: number;
  createdAt: string;
}

const emptyForm = {
  title: "",
  slug: "",
  client: "",
  category: "Web & Digital Platforms",
  services: "Websites & Web Applications, UI/UX Engineering",
  shortDescription: "",
  description: "",
  challenge: "",
  solution: "",
  build: "",
  result: "",
  technologies: "Next.js, TypeScript, Tailwind CSS",
  images: "",
  featured: false,
  published: true,
  order: 0,
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterState, setFilterState] = useState<"all" | "published" | "draft">("all");

  // Edit / Create Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<ProjectItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (data.success) {
        setProjects(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData(emptyForm);
    setFormError("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      client: project.client,
      category: project.category,
      services: project.services?.join(", ") || "",
      shortDescription: project.shortDescription || "",
      description: project.description,
      challenge: project.challenge,
      solution: project.solution,
      build: project.build,
      result: project.result,
      technologies: project.technologies?.join(", ") || "",
      images: project.images?.join(", ") || "",
      featured: project.featured,
      published: project.published,
      order: project.order || 0,
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    if (!editingProject) {
      // Auto-generate slug when creating new
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
        services: formData.services.split(",").map((s) => s.trim()).filter(Boolean),
        technologies: formData.technologies.split(",").map((s) => s.trim()).filter(Boolean),
        images: formData.images.split(",").map((s) => s.trim()).filter(Boolean),
      };

      const url = "/api/admin/projects";
      const method = editingProject ? "PUT" : "POST";
      const body = editingProject ? { ...payload, id: editingProject._id } : payload;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save project");
      }

      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      setFormError(err.message || "Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublished = async (project: ProjectItem) => {
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: project._id, published: !project.published }),
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) =>
          prev.map((p) => (p._id === project._id ? { ...p, published: !p.published } : p))
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
      const res = await fetch(`/api/admin/projects?id=${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => prev.filter((p) => p._id !== deleteTarget._id));
        setDeleteTarget(null);
      }
    } catch (err) {
      console.error("Failed to delete project:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (filterState === "published") return p.published;
    if (filterState === "draft") return !p.published;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAEAE7]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="blue">CASE STUDIES & REPERTOIRE</Badge>
            <span className="text-xs font-mono text-[#8E8E8E]">Portfolio CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight">
            Projects Management
          </h1>
          <p className="text-xs text-[#6F6F6F] mt-1">
            Create, edit, curate, and publish engineering case studies showcased on the public site.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchProjects}
            disabled={loading}
            className="p-2.5 rounded-xl bg-white border border-[#EAEAE7] text-[#171717] hover:bg-[#FAFAF8] transition-colors shadow-xs"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <Button onClick={handleOpenCreate} size="sm">
            + NEW PROJECT
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          {(["all", "published", "draft"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterState(tab)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg uppercase transition-colors ${
                filterState === tab
                  ? "bg-[#171717] text-white font-semibold"
                  : "bg-white border border-[#EAEAE7] text-[#6F6F6F] hover:text-[#171717]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#8E8E8E] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects or clients..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-[#EAEAE7] text-[#171717] placeholder:text-[#8E8E8E] focus:outline-none focus:border-[#2C72B2]"
          />
        </div>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="p-12 text-center text-xs font-mono text-[#8E8E8E] bg-white rounded-2xl border border-[#EAEAE7]">
          Loading portfolio database records...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#EAEAE7] space-y-3">
          <Briefcase className="w-8 h-8 text-[#8E8E8E] mx-auto opacity-50" />
          <p className="text-sm font-bold text-[#171717]">No projects match your filter</p>
          <Button onClick={handleOpenCreate} size="sm">
            Create First Project
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProjects.map((p) => (
            <div
              key={p._id}
              className="p-5 rounded-2xl bg-white border border-[#EAEAE7] shadow-xs hover:border-[#2C72B2]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-base font-bold text-[#171717]">
                    {p.title}
                  </span>
                  <span className="text-xs font-medium text-[#6F6F6F] bg-[#FAFAF8] px-2 py-0.5 rounded-md border border-[#EAEAE7]">
                    {p.client}
                  </span>
                  <span className="text-[10px] font-mono text-[#2C72B2] bg-[#EBF3FA] px-2 py-0.5 rounded-md border border-[#D5E7F7]">
                    {p.category}
                  </span>
                  {p.featured && (
                    <span className="text-[10px] font-mono text-[#C4320A] bg-[#FEF6EE] px-2 py-0.5 rounded-md border border-[#F9DBAF] flex items-center gap-1 font-semibold">
                      <Star className="w-2.5 h-2.5 fill-current" /> Featured
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-[#8E8E8E]">
                    Order #{p.order}
                  </span>
                </div>

                <p className="text-xs text-[#6F6F6F] line-clamp-1">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.technologies?.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717]"
                    >
                      {t}
                    </span>
                  ))}
                  {p.technologies?.length > 5 && (
                    <span className="text-[10px] font-mono text-[#8E8E8E] self-center">
                      +{p.technologies.length - 5} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                {/* Public Preview Link */}
                <Link
                  href={`/work/${p.slug}`}
                  target="_blank"
                  className="p-2 rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#6F6F6F] hover:text-[#171717] hover:border-[#D5E7F7] transition-colors"
                  title="View Live Public Case Study"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>

                {/* Publish Toggle Button */}
                <button
                  onClick={() => handleTogglePublished(p)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
                    p.published
                      ? "bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]"
                      : "bg-[#FAFAF8] text-[#8E8E8E] border border-[#EAEAE7]"
                  }`}
                  title={p.published ? "Click to unpublish" : "Click to publish"}
                >
                  {p.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{p.published ? "Published" : "Draft"}</span>
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => handleOpenEdit(p)}
                  className="px-3 py-1.5 rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-xs font-mono text-[#171717] hover:bg-white hover:border-[#2C72B2] transition-colors flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5 text-[#2C72B2]" />
                  <span>Edit</span>
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => setDeleteTarget(p)}
                  className="p-2 rounded-xl text-[#8E8E8E] hover:text-[#D92D20] hover:bg-[#FEE4E2]/40 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#EAEAE7] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#EAEAE7] flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8E8E8E] tracking-wider block">
                  Project Record Editor
                </span>
                <h2 className="text-xl font-black text-[#171717] mt-0.5">
                  {editingProject ? `Edit: ${editingProject.title}` : "Add New Project"}
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
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. WASSHOT"
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
                    placeholder="e.g. wasshot"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. WASSHOT Technologies"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Software & AI Automation"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                  Short Description / Executive Summary
                </label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief 1-sentence teaser shown on work index cards..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                  Overview & Philosophy *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed project introduction and core purpose..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    The Challenge *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    placeholder="What problem did the client face?"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    The Solution *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    placeholder="How did UXI architect the solution?"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    The Technical Build *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.build}
                    onChange={(e) => setFormData({ ...formData, build: e.target.value })}
                    placeholder="Engineering stack, database, queues, edge infrastructure..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Measurable Result *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.result}
                    onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                    placeholder="Metrics, latency reduction, conversion lift..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Services / Disciplines (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.services}
                    onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                    placeholder="Web Applications, AI Automation"
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
                    placeholder="Next.js, TypeScript, Node.js"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                  Preview Image URL (or upload in Media Library)
                </label>
                <input
                  type="text"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  placeholder="/projects/wasshot-preview.svg or /uploads/..."
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
                    Published on live website
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
                    Featured on homepage
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

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EAEAE7]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-mono rounded-full bg-[#FAFAF8] border border-[#EAEAE7] text-[#6F6F6F] hover:text-[#171717]"
                >
                  Cancel
                </button>

                <Button type="submit" disabled={saving} size="sm">
                  {saving ? "SAVING..." : editingProject ? "UPDATE PROJECT" : "PUBLISH PROJECT"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Project Case Study"
        itemName={deleteTarget ? deleteTarget.title : ""}
        message="Are you sure you want to delete this case study? It will be removed from both the admin dashboard and public site."
        isDeleting={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
