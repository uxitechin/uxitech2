"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Lock, Mail, KeyRound, AlertCircle, Sparkles } from "lucide-react";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromUrl = searchParams.get("from") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed. Please verify credentials.");
      }

      // Successful login
      router.push(fromUrl);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-4 sm:p-6 select-none relative overflow-hidden">
      {/* Background Subtle Gradient Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Atmospheric Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2C72B2]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-3xl border border-[#EAEAE7] shadow-uxi-lg p-7 sm:p-9 space-y-7 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#EBF3FA] border border-[#D5E7F7] text-[#2C72B2] flex items-center justify-center mx-auto shadow-xs">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Badge variant="blue">OPERATIONS COMMAND</Badge>
              </div>
              <h1 className="text-2xl font-black text-[#171717] tracking-tight">
                UXI Studio Console
              </h1>
              <p className="text-xs text-[#6F6F6F] mt-1 font-mono">
                Authorised Personnel Authentication
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-[#FEE4E2] border border-[#FECDCA] text-[#D92D20] text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#6F6F6F] mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8E8E8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@uxitech.in"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] placeholder:text-[#8E8E8E] focus:outline-none focus:border-[#2C72B2] focus:bg-white transition-all font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#6F6F6F] mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#8E8E8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] placeholder:text-[#8E8E8E] focus:outline-none focus:border-[#2C72B2] focus:bg-white transition-all font-sans"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
                size="md"
              >
                {loading ? "AUTHENTICATING..." : "SIGN IN TO CONSOLE"}
              </Button>
            </div>
          </form>

          {/* Quick Credential Helper Note */}
          <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[11px] font-mono text-[#8E8E8E] text-center space-y-1">
            <div className="flex items-center justify-center gap-1 text-[#2C72B2] font-semibold">
              <Sparkles className="w-3 h-3" />
              <span>DEFAULT MASTER CREDENTIALS</span>
            </div>
            <p>
              Email: <span className="text-[#171717]">admin@uxitech.in</span>
            </p>
            <p>
              Password: <span className="text-[#171717]">AdminPassword123!</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center font-mono text-xs text-[#8E8E8E]">
          Loading Admin Security Console...
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
