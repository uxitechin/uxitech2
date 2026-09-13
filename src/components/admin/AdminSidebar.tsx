"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  Layers,
  MessageSquareQuote,
  FileEdit,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import Badge from "@/components/ui/Badge";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeCount?: number;
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);
  const [newEnquiriesCount, setNewEnquiriesCount] = useState<number>(0);

  useEffect(() => {
    // Fetch current admin session
    fetch("/api/admin/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.admin) {
          setAdminUser(data.admin);
        }
      })
      .catch(() => {});

    // Fetch new enquiries count
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.stats?.enquiries?.new !== undefined) {
          setNewEnquiriesCount(data.stats.enquiries.new);
        }
      })
      .catch(() => {});
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navItems: NavItem[] = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    {
      name: "Enquiries",
      href: "/admin/enquiries",
      icon: Inbox,
      badgeCount: newEnquiriesCount > 0 ? newEnquiriesCount : undefined,
    },
    { name: "Projects", href: "/admin/projects", icon: Briefcase },
    { name: "Services", href: "/admin/services", icon: Layers },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
    { name: "Site Content", href: "/admin/content", icon: FileEdit },
    { name: "Media Library", href: "/admin/media", icon: ImageIcon },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#EAEAE7] flex flex-col h-screen sticky top-0 shrink-0 select-none z-30">
      {/* Header / Brand */}
      <div className="p-5 border-b border-[#EAEAE7] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#171717] flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-sm">
              U
            </div>
            <div>
              <span className="font-extrabold text-[#171717] tracking-tight text-base leading-none block">
                UXI TECH
              </span>
              <span className="text-[10px] font-mono uppercase text-[#8E8E8E] tracking-wider block mt-0.5">
                Admin Console
              </span>
            </div>
          </Link>
          <Badge variant="blue">v2.0</Badge>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#FAFAF8] border border-[#EAEAE7] text-xs font-mono text-[#6F6F6F] hover:text-[#171717] hover:border-[#D5E7F7] hover:bg-[#EBF3FA]/40 transition-colors"
        >
          <span>Live Site Preview</span>
          <ExternalLink className="w-3 h-3 text-[#2C72B2]" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3.5 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#8E8E8E]">
          Management
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? "bg-[#171717] text-white font-semibold shadow-sm"
                  : "text-[#6F6F6F] hover:text-[#171717] hover:bg-[#FAFAF8]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-[#38BDF8]" : "text-[#8E8E8E]"
                  }`}
                />
                <span>{item.name}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {item.badgeCount !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-full ${
                      isActive
                        ? "bg-[#38BDF8] text-[#171717]"
                        : "bg-[#2C72B2] text-white"
                    }`}
                  >
                    {item.badgeCount}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/60" />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-[#EAEAE7] bg-[#FAFAF8] space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-[#EAEAE7] text-[#2C72B2] font-mono font-bold text-xs flex items-center justify-center shadow-xs">
            {adminUser?.name ? adminUser.name.slice(0, 2).toUpperCase() : "AD"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-[#171717] truncate leading-tight">
              {adminUser?.name || "UXI Administrator"}
            </p>
            <p className="text-[11px] font-mono text-[#8E8E8E] truncate">
              {adminUser?.email || "admin@uxitech.in"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-[#2C72B2] bg-[#EBF3FA] px-2 py-0.5 rounded-md border border-[#D5E7F7]">
            <ShieldCheck className="w-3 h-3" />
            {adminUser?.role || "superadmin"}
          </span>

          <button
            onClick={handleLogout}
            title="Sign out of Admin Console"
            className="inline-flex items-center gap-1 text-xs font-mono text-[#8E8E8E] hover:text-[#1D68BD] transition-colors px-2 py-1 rounded-md hover:bg-white"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
