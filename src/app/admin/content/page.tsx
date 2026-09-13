"use client";

import React, { useState, useEffect } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  FileEdit,
  Sparkles,
  UserCheck,
  Megaphone,
  PhoneCall,
  Save,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

interface ContentSections {
  hero: {
    badge: string;
    headlinePart1: string;
    headlinePart2: string;
    subheadline: string;
    ctaPrimaryText: string;
    ctaPrimaryLink: string;
    ctaSecondaryText: string;
    ctaSecondaryLink: string;
  };
  founder: {
    badge: string;
    heading: string;
    quote: string;
    founderName: string;
    founderRole: string;
    location: string;
  };
  finalCta: {
    badge: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
  contact: {
    phoneNumbers: string[];
    email: string;
    address: string;
  };
}

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<"hero" | "founder" | "finalCta" | "contact">("hero");
  const [content, setContent] = useState<ContentSections | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content");
      const data = await res.json();
      if (data.success && data.data) {
        setContent(data.data);
      }
    } catch (err) {
      console.error("Failed to load content:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSaveSection = async (section: keyof ContentSections) => {
    if (!content) return;
    setSaving(true);
    setSaveSuccess(false);
    setSaveError("");

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section,
          data: content[section],
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update content");
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err.message || "Failed to update section");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "hero", label: "Hero Header", icon: Sparkles },
    { id: "founder", label: "Founder Section", icon: UserCheck },
    { id: "finalCta", label: "Final Call-to-Action", icon: Megaphone },
    { id: "contact", label: "Contact Details", icon: PhoneCall },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAEAE7]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="blue">DYNAMIC COPY CMS</Badge>
            <span className="text-xs font-mono text-[#8E8E8E]">Homepage & Global Text</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight">
            Site Copy & Editorial
          </h1>
          <p className="text-xs text-[#6F6F6F] mt-1">
            Update marketing copy, headlines, value statements, and studio contact points.
          </p>
        </div>

        <button
          onClick={fetchContent}
          disabled={loading}
          className="p-2.5 rounded-xl bg-white border border-[#EAEAE7] text-[#171717] hover:bg-[#FAFAF8] transition-colors shadow-xs self-start sm:self-auto"
          title="Refresh content"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EAEAE7] pb-3 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSaveSuccess(false);
                setSaveError("");
              }}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#171717] text-white font-bold shadow-xs"
                  : "bg-white border border-[#EAEAE7] text-[#6F6F6F] hover:text-[#171717]"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#38BDF8]" : "text-[#8E8E8E]"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Status Banners */}
      {saveSuccess && (
        <div className="p-3.5 rounded-2xl bg-[#ECFDF3] border border-[#ABEFC6] text-[#027A48] text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>Section copy successfully updated and synchronized to MongoDB!</span>
        </div>
      )}

      {saveError && (
        <div className="p-3.5 rounded-2xl bg-[#FEE4E2] border border-[#FECDCA] text-[#D92D20] text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4" />
          <span>{saveError}</span>
        </div>
      )}

      {/* Section Forms */}
      {loading || !content ? (
        <div className="p-12 text-center text-xs font-mono text-[#8E8E8E] bg-white rounded-2xl border border-[#EAEAE7]">
          Connecting to database and reading site content...
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#EAEAE7] p-6 sm:p-8 shadow-xs space-y-6">
          {/* TAB 1: HERO */}
          {activeTab === "hero" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                  Pill Badge Text
                </label>
                <input
                  type="text"
                  value={content.hero.badge || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, badge: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Headline Line 1
                  </label>
                  <input
                    type="text"
                    value={content.hero.headlinePart1 || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, headlinePart1: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Headline Line 2
                  </label>
                  <input
                    type="text"
                    value={content.hero.headlinePart2 || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, headlinePart2: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                  Subheadline / Mission Statement
                </label>
                <textarea
                  rows={3}
                  value={content.hero.subheadline || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, subheadline: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Primary CTA Text
                  </label>
                  <input
                    type="text"
                    value={content.hero.ctaPrimaryText || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, ctaPrimaryText: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Secondary CTA Text
                  </label>
                  <input
                    type="text"
                    value={content.hero.ctaSecondaryText || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, ctaSecondaryText: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FOUNDER */}
          {activeTab === "founder" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Section Badge
                  </label>
                  <input
                    type="text"
                    value={content.founder.badge || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        founder: { ...content.founder, badge: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={content.founder.heading || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        founder: { ...content.founder, heading: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                  Architectural Quote / Philosophy
                </label>
                <textarea
                  rows={4}
                  value={content.founder.quote || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      founder: { ...content.founder, quote: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Founder Name
                  </label>
                  <input
                    type="text"
                    value={content.founder.founderName || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        founder: { ...content.founder, founderName: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Title / Role
                  </label>
                  <input
                    type="text"
                    value={content.founder.founderRole || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        founder: { ...content.founder, founderRole: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Studio Location
                  </label>
                  <input
                    type="text"
                    value={content.founder.location || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        founder: { ...content.founder, location: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FINAL CTA */}
          {activeTab === "finalCta" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                  Badge Text
                </label>
                <input
                  type="text"
                  value={content.finalCta.badge || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      finalCta: { ...content.finalCta, badge: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                  Headline Title
                </label>
                <input
                  type="text"
                  value={content.finalCta.title || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      finalCta: { ...content.finalCta, title: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                  Subtitle Description
                </label>
                <textarea
                  rows={3}
                  value={content.finalCta.subtitle || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      finalCta: { ...content.finalCta, subtitle: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={content.finalCta.ctaText || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      finalCta: { ...content.finalCta, ctaText: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                />
              </div>
            </div>
          )}

          {/* TAB 4: CONTACT */}
          {activeTab === "contact" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                  Studio Phone Numbers (comma-separated)
                </label>
                <input
                  type="text"
                  value={content.contact.phoneNumbers?.join(", ") || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: {
                        ...content.contact,
                        phoneNumbers: e.target.value.split(",").map((s) => s.trim()),
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={content.contact.email || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: { ...content.contact, email: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                  Physical Studio Address
                </label>
                <input
                  type="text"
                  value={content.contact.address || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: { ...content.contact, address: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2]"
                />
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="pt-4 border-t border-[#EAEAE7] flex items-center justify-end">
            <Button
              onClick={() => handleSaveSection(activeTab)}
              disabled={saving}
              size="md"
            >
              {saving ? "SAVING TO MONGO..." : `SAVE ${activeTab.toUpperCase()} COPY`}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
