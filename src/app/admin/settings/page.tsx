"use client";

import React, { useState, useEffect } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  Settings,
  ShieldCheck,
  User,
  Mail,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
} from "lucide-react";

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLoginAt?: string;
  createdAt?: string;
}

export default function AdminSettingsPage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Profile Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState("");

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success && data.data) {
        setProfile(data.data);
        setName(data.data.name);
        setEmail(data.data.email);
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileSuccess(false);
    setProfileError("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update profile");
      }

      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
      fetchProfile();
    } catch (err: any) {
      setProfileError(err.message || "Failed to update profile");
    } finally {
      setProfileSaving(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaving(true);
    setPasswordSuccess(false);
    setPasswordError("");

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      setPasswordSaving(false);
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      setPasswordSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update password");
      }

      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err: any) {
      setPasswordError(err.message || "Failed to update password");
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAEAE7]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="blue">SYSTEM PREFERENCES</Badge>
            <span className="text-xs font-mono text-[#8E8E8E]">Access & Security</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight">
            Admin Account & Security
          </h1>
          <p className="text-xs text-[#6F6F6F] mt-1">
            Manage your credentials, administrative security keys, and account identity.
          </p>
        </div>
      </div>

      {loading || !profile ? (
        <div className="p-12 text-center text-xs font-mono text-[#8E8E8E] bg-white rounded-2xl border border-[#EAEAE7]">
          Loading administrative profile...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Account Overview Card */}
          <div className="bg-white rounded-3xl border border-[#EAEAE7] p-6 shadow-xs space-y-6 h-fit">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF3FA] border border-[#D5E7F7] text-[#2C72B2] font-mono font-black text-base flex items-center justify-center">
                {profile.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="text-base font-bold text-[#171717]">{profile.name}</h2>
                <p className="text-xs font-mono text-[#8E8E8E]">{profile.email}</p>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-[#EAEAE7] text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[#8E8E8E]">Security Role</span>
                <span className="inline-flex items-center gap-1 font-mono uppercase text-[#2C72B2] bg-[#EBF3FA] px-2 py-0.5 rounded-md border border-[#D5E7F7]">
                  <ShieldCheck className="w-3 h-3" />
                  {profile.role}
                </span>
              </div>

              {profile.lastLoginAt && (
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[#8E8E8E] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Last Session
                  </span>
                  <span className="font-mono text-[#171717]">
                    {new Date(profile.lastLoginAt).toLocaleString()}
                  </span>
                </div>
              )}

              {profile.createdAt && (
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[#8E8E8E] flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Registered
                  </span>
                  <span className="font-mono text-[#171717]">
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Form Area: Profile & Password */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Profile Details */}
            <div className="bg-white rounded-3xl border border-[#EAEAE7] p-6 sm:p-7 shadow-xs space-y-5">
              <div>
                <h3 className="text-base font-bold text-[#171717]">
                  Identity Information
                </h3>
                <p className="text-xs text-[#6F6F6F] mt-0.5">
                  Update your display name and administrative notifications email.
                </p>
              </div>

              {profileSuccess && (
                <div className="p-3 rounded-xl bg-[#ECFDF3] border border-[#ABEFC6] text-[#027A48] text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Profile details updated successfully.</span>
                </div>
              )}

              {profileError && (
                <div className="p-3 rounded-xl bg-[#FEE4E2] border border-[#FECDCA] text-[#D92D20] text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{profileError}</span>
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8E8E8E] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Admin Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8E8E8E] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button type="submit" disabled={profileSaving} size="sm">
                    {profileSaving ? "SAVING..." : "UPDATE PROFILE"}
                  </Button>
                </div>
              </form>
            </div>

            {/* 2. Password Security */}
            <div className="bg-white rounded-3xl border border-[#EAEAE7] p-6 sm:p-7 shadow-xs space-y-5">
              <div>
                <h3 className="text-base font-bold text-[#171717]">
                  Password Security
                </h3>
                <p className="text-xs text-[#6F6F6F] mt-0.5">
                  Change administrative login password. Minimum 8 characters.
                </p>
              </div>

              {passwordSuccess && (
                <div className="p-3 rounded-xl bg-[#ECFDF3] border border-[#ABEFC6] text-[#027A48] text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Password changed successfully.</span>
                </div>
              )}

              {passwordError && (
                <div className="p-3 rounded-xl bg-[#FEE4E2] border border-[#FECDCA] text-[#D92D20] text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{passwordError}</span>
                </div>
              )}

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Current Master Password
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-[#8E8E8E] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button type="submit" disabled={passwordSaving} size="sm">
                    {passwordSaving ? "UPDATING..." : "CHANGE PASSWORD"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
