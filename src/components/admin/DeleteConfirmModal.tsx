"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  itemName?: string;
  message?: string;
  isDeleting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  title,
  itemName,
  message = "This action cannot be undone. This item will be permanently removed from the database.",
  isDeleting = false,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-[#EAEAE7] shadow-uxi-lg max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-2xl bg-[#FEE4E2] border border-[#FECDCA] text-[#D92D20] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="p-1 rounded-lg text-[#8E8E8E] hover:text-[#171717] hover:bg-[#FAFAF8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#171717]">{title}</h3>
          {itemName && (
            <div className="mt-1 px-3 py-1.5 rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-xs font-mono text-[#171717] font-semibold truncate">
              {itemName}
            </div>
          )}
          <p className="text-xs text-[#6F6F6F] mt-2 leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 text-xs font-mono font-medium rounded-full bg-[#FAFAF8] border border-[#EAEAE7] text-[#6F6F6F] hover:text-[#171717] hover:bg-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-5 py-2 text-xs font-mono font-bold rounded-full bg-[#D92D20] text-white hover:bg-[#B42318] transition-colors flex items-center gap-1.5 shadow-sm"
          >
            {isDeleting ? "Deleting..." : "Confirm Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
