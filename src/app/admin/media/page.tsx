"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import {
  Upload,
  Image as ImageIcon,
  Copy,
  CheckCircle2,
  Trash2,
  RefreshCw,
  ExternalLink,
  HardDrive,
} from "lucide-react";

interface MediaItem {
  _id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  altText?: string;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Deletion modal state
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (data.success) {
        setMediaItems(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch media:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError("");

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("altText", file.name.split(".")[0]);

        const res = await fetch("/api/admin/media", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to upload image");
        }
      }

      fetchMedia();
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload media");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/media?id=${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setMediaItems((prev) => prev.filter((m) => m._id !== deleteTarget._id));
        setDeleteTarget(null);
      }
    } catch (err) {
      console.error("Failed to delete media:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAEAE7]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="blue">DIGITAL ASSET STORAGE</Badge>
            <span className="text-xs font-mono text-[#8E8E8E]">Static CDN & Uploads</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight">
            Media Library
          </h1>
          <p className="text-xs text-[#6F6F6F] mt-1">
            Store, preview, and copy public URLs for project screenshots, team portraits, and graphics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchMedia}
            disabled={loading}
            className="p-2.5 rounded-xl bg-white border border-[#EAEAE7] text-[#171717] hover:bg-[#FAFAF8] transition-colors shadow-xs"
            title="Refresh media list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            size="sm"
          >
            {uploading ? "UPLOADING..." : "+ UPLOAD ASSET"}
          </Button>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileUpload(e.target.files)}
        accept="image/*,.svg,.pdf"
        multiple
        className="hidden"
      />

      {/* Drag and Drop Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFileUpload(e.dataTransfer.files);
        }}
        className="border-2 border-dashed border-[#EAEAE7] hover:border-[#2C72B2] bg-white rounded-3xl p-8 text-center cursor-pointer transition-colors group space-y-3"
      >
        <div className="w-12 h-12 rounded-2xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#6F6F6F] group-hover:text-[#2C72B2] group-hover:border-[#D5E7F7] group-hover:bg-[#EBF3FA] flex items-center justify-center mx-auto transition-all">
          <Upload className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-bold text-[#171717]">
            Click or drag & drop images to upload
          </p>
          <p className="text-xs text-[#6F6F6F] mt-0.5 font-mono">
            Supports PNG, JPEG, SVG, WebP up to 10MB per file
          </p>
        </div>
      </div>

      {uploadError && (
        <div className="p-3.5 rounded-xl bg-[#FEE4E2] border border-[#FECDCA] text-xs text-[#D92D20]">
          {uploadError}
        </div>
      )}

      {/* Media Grid */}
      {loading ? (
        <div className="p-12 text-center text-xs font-mono text-[#8E8E8E] bg-white rounded-2xl border border-[#EAEAE7]">
          Loading media assets from database...
        </div>
      ) : mediaItems.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#EAEAE7] space-y-2">
          <ImageIcon className="w-8 h-8 text-[#8E8E8E] mx-auto opacity-50" />
          <p className="text-sm font-bold text-[#171717]">No media items found</p>
          <p className="text-xs text-[#6F6F6F]">
            Upload screenshots, diagrams, or client badges above to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mediaItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-[#EAEAE7] p-3 shadow-xs hover:border-[#2C72B2]/40 transition-all flex flex-col justify-between group space-y-2.5"
            >
              {/* Thumbnail Container */}
              <div className="aspect-video w-full rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] overflow-hidden relative flex items-center justify-center">
                {item.mimeType.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.url}
                    alt={item.altText || item.originalName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <HardDrive className="w-8 h-8 text-[#8E8E8E]" />
                )}
              </div>

              {/* Metadata */}
              <div>
                <p className="text-xs font-bold text-[#171717] truncate leading-tight" title={item.originalName}>
                  {item.originalName}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#8E8E8E] mt-1">
                  <span>{formatFileSize(item.size)}</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-[#EAEAE7] flex items-center justify-between">
                <button
                  onClick={() => copyToClipboard(item.url)}
                  className="flex items-center gap-1 text-[11px] font-mono text-[#2C72B2] hover:underline"
                >
                  {copiedUrl === item.url ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-[#027A48]" />
                      <span className="text-[#027A48]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 text-[#8E8E8E] hover:text-[#171717]"
                    title="Open full preview"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="p-1 text-[#8E8E8E] hover:text-[#D92D20]"
                    title="Delete Media"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Media Item"
        itemName={deleteTarget ? deleteTarget.originalName : ""}
        message="Are you sure you want to delete this asset? Existing pages linking to this URL will be broken."
        isDeleting={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
