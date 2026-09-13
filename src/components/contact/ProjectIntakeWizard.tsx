"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Loader2,
  AlertCircle,
  Building,
  Mail,
  User,
  Phone,
  Briefcase,
} from "lucide-react";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

const SERVICE_OPTIONS = [
  "Website",
  "Web Application",
  "Mobile Application",
  "AI / Automation",
  "CRM",
  "Custom Software",
  "Branding",
  "Meta / Google Ads",
  "SEO",
  "Academic Project",
  "Something Else",
];

const BUDGET_OPTIONS = [
  "Under ₹1,00,000 (~$1.2k)",
  "₹1,00,000 – ₹3,00,000 (~$1.2k – $3.5k)",
  "₹3,00,000 – ₹8,00,000 (~$3.5k – $10k)",
  "₹8,00,000+ (~$10k+)",
  "Flexible / To Be Evaluated",
];

const TIMELINE_OPTIONS = [
  "Urgent (< 30 days)",
  "1 – 2 Months",
  "2 – 4 Months",
  "Flexible / Long-Term",
];

const BUSINESS_TYPE_OPTIONS = [
  "E-Commerce / D2C / Retail",
  "Technology, SaaS & Software",
  "Healthcare / Clinic / Hospital",
  "Real Estate / Architecture / Construction",
  "Education / Coaching / EdTech",
  "B2B Services & Manufacturing",
  "Agency / Media / Marketing",
  "Restaurant / Food & Hospitality",
  "Finance / Legal / Consulting",
  "Personal Brand / Creator",
  "Startup / Early Stage Venture",
  "Other",
];

export default function ProjectIntakeWizard({
  initialService,
}: {
  initialService?: string;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialService ? [initialService] : ["Web Application"]
  );
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(BUDGET_OPTIONS[1]);
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[1]);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: BUSINESS_TYPE_OPTIONS[0],
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const validateStep = (step: number) => {
    setErrorMsg("");
    if (step === 1) {
      if (selectedServices.length === 0) {
        setErrorMsg("Please select at least one capability to proceed.");
        return false;
      }
    }
    if (step === 2) {
      if (!description.trim() || description.trim().length < 8) {
        setErrorMsg("Please provide a brief outline of your project or idea.");
        return false;
      }
    }
    if (step === 5) {
      if (!details.name.trim() || details.name.trim().length < 2) {
        setErrorMsg("Please provide your full name.");
        return false;
      }
      if (!details.phone.trim() || details.phone.trim().length < 7) {
        setErrorMsg("Please provide your phone number so we can reach you.");
        return false;
      }
      if (
        !details.email.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim())
      ) {
        setErrorMsg("Please enter a valid email address.");
        return false;
      }
      if (!details.businessName.trim()) {
        setErrorMsg("Please provide your business or brand name.");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(6, prev + 1));
    }
  };

  const prevStep = () => {
    setErrorMsg("");
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) {
      setCurrentStep(5);
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: details.name,
          email: details.email,
          phone: details.phone,
          company: details.businessName,
          businessName: details.businessName,
          businessType: details.businessType,
          services: selectedServices,
          description,
          budget,
          timeline,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit project request.");
      }

      setIsSuccess(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#2C72B2", "#1D68BD", "#38BDF8", "#171717"],
      });
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 sm:p-14 bg-white rounded-3xl border border-[#D5E7F7] shadow-uxi-lg text-center max-w-xl mx-auto space-y-6"
      >
        <div className="w-16 h-16 rounded-full bg-[#EBF3FA] border border-[#D5E7F7] text-[#2C72B2] flex items-center justify-center mx-auto shadow-uxi-sm">
          <Check className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <Badge variant="blue">Inquiry Received</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">
            YOUR IDEA IS ON ITS WAY.
          </h2>
          <p className="text-base text-[#6F6F6F]">
            UXI has received your request. We will be in touch within 24 hours.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#EAEAE7] text-left text-xs font-mono text-[#6F6F6F] space-y-1.5">
          <p className="text-[#171717] font-bold">Summary Dispatched to UXI:</p>
          <p>Name: {details.name}</p>
          <p>Phone: {details.phone}</p>
          <p>Email: {details.email}</p>
          <p>Business: {details.businessName} ({details.businessType})</p>
          <p>Capabilities: {selectedServices.join(", ")}</p>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsSuccess(false);
            setCurrentStep(1);
            setDescription("");
            setDetails({
              name: "",
              email: "",
              phone: "",
              businessName: "",
              businessType: BUSINESS_TYPE_OPTIONS[0],
            });
          }}
          className="text-xs font-bold uppercase tracking-wider text-[#2C72B2] hover:underline"
        >
          Submit Another Request
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-10 border border-[#EAEAE7] shadow-uxi-md max-w-2xl mx-auto">
      {/* Step Tracker Indicator */}
      <div className="flex items-center justify-between pb-5 sm:pb-6 mb-6 sm:mb-8 border-b border-[#EAEAE7]">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#EBF3FA] text-[#2C72B2] border border-[#D5E7F7] flex items-center justify-center text-xs font-mono font-bold">
            {currentStep}
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-[#6F6F6F]">
            Step 0{currentStep} of 06
          </span>
        </div>

        {/* Mini progress bar */}
        <div className="w-24 sm:w-32 h-1.5 bg-[#F5F5F3] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#2C72B2] to-[#1D68BD] transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-3.5 rounded-xl bg-[#D5E7F7]/40 border border-[#D5E7F7] text-[#1D68BD] text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Step Forms */}
      <AnimatePresence mode="wait">
        {/* STEP 1 */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                WHAT DO YOU WANT TO BUILD?
              </h2>
              <p className="text-xs sm:text-sm text-[#6F6F6F] mt-1">
                Select all capabilities that apply to your system.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
              {SERVICE_OPTIONS.map((srv) => {
                const isSelected = selectedServices.includes(srv);
                return (
                  <button
                    key={srv}
                    type="button"
                    onClick={() => toggleService(srv)}
                    className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl text-xs font-bold text-left transition-all duration-200 border flex items-center justify-between ${
                      isSelected
                        ? "bg-[#EBF3FA] text-[#171717] border-[#2C72B2] shadow-sm ring-1 ring-[#2C72B2]/20"
                        : "bg-[#FAFAF8] hover:bg-white text-[#6F6F6F] border-[#EAEAE7]"
                    }`}
                  >
                    <span>{srv}</span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#2C72B2] shrink-0 ml-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                TELL US ABOUT IT.
              </h2>
              <p className="text-xs sm:text-sm text-[#6F6F6F] mt-1">
                Describe your project, product vision, or key operational challenges.
              </p>
            </div>

            <div>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="We are looking to build a modern system that integrates our sales operations with autonomous AI workflows..."
                className="w-full p-4 text-sm rounded-2xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2] focus:bg-white transition-all resize-none"
              />
            </div>
          </motion.div>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                ESTIMATED INVESTMENT
              </h2>
              <p className="text-xs sm:text-sm text-[#6F6F6F] mt-1">
                Select your anticipated project budget range.
              </p>
            </div>

            <div className="space-y-2.5">
              {BUDGET_OPTIONS.map((opt) => {
                const isSelected = budget === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setBudget(opt)}
                    className={`w-full p-4 rounded-2xl text-left text-sm font-semibold transition-all duration-200 border flex items-center justify-between ${
                      isSelected
                        ? "bg-[#EBF3FA] text-[#171717] border-[#2C72B2] shadow-sm ring-1 ring-[#2C72B2]/20"
                        : "bg-[#FAFAF8] hover:bg-white text-[#6F6F6F] border-[#EAEAE7]"
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#2C72B2]" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* STEP 4 */}
        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                WHAT&apos;S YOUR TIMELINE?
              </h2>
              <p className="text-xs sm:text-sm text-[#6F6F6F] mt-1">
                Estimated duration or launch target date.
              </p>
            </div>

            <div className="space-y-2.5">
              {TIMELINE_OPTIONS.map((opt) => {
                const isSelected = timeline === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setTimeline(opt)}
                    className={`w-full p-4 rounded-2xl text-left text-sm font-semibold transition-all duration-200 border flex items-center justify-between ${
                      isSelected
                        ? "bg-[#EBF3FA] text-[#171717] border-[#2C72B2] shadow-sm ring-1 ring-[#2C72B2]/20"
                        : "bg-[#FAFAF8] hover:bg-white text-[#6F6F6F] border-[#EAEAE7]"
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#2C72B2]" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* STEP 5 */}
        {currentStep === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                YOUR CONTACT & BUSINESS
              </h2>
              <p className="text-xs sm:text-sm text-[#6F6F6F] mt-1">
                Tell us how to reach you with your tailored roadmap & project estimate.
              </p>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8E8E8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={details.name}
                    onChange={(e) =>
                      setDetails({ ...details, name: e.target.value })
                    }
                    placeholder="e.g. Alex Morgan"
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Phone and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8E8E8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={details.phone}
                      onChange={(e) =>
                        setDetails({ ...details, phone: e.target.value })
                      }
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8E8E8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={details.email}
                      onChange={(e) =>
                        setDetails({ ...details, email: e.target.value })
                      }
                      placeholder="alex@company.com"
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2] focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Business Name and Business Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Business / Brand Name *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-[#8E8E8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={details.businessName}
                      onChange={(e) =>
                        setDetails({ ...details, businessName: e.target.value })
                      }
                      placeholder="e.g. Acme Studio / Dr. Clinic"
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6F6F6F] mb-1">
                    Business Type / Industry
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-[#8E8E8E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={details.businessType}
                      onChange={(e) =>
                        setDetails({ ...details, businessType: e.target.value })
                      }
                      className="w-full pl-10 pr-8 py-3 text-sm rounded-xl bg-[#FAFAF8] border border-[#EAEAE7] text-[#171717] focus:outline-none focus:border-[#2C72B2] focus:bg-white appearance-none cursor-pointer transition-colors"
                    >
                      {BUSINESS_TYPE_OPTIONS.map((bt) => (
                        <option key={bt} value={bt}>
                          {bt}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#8E8E8E] text-xs">
                      ▼
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 6 */}
        {currentStep === 6 && (
          <motion.div
            key="step6"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                VERIFY & INITIATE
              </h2>
              <p className="text-xs sm:text-sm text-[#6F6F6F] mt-1">
                Confirm your parameters before connecting with our engineering team.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#EAEAE7] space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[#EAEAE7]">
                <span className="text-xs font-mono uppercase text-[#6F6F6F]">
                  Selected Scope
                </span>
                <span className="text-xs font-bold text-[#171717]">
                  {selectedServices.length} Capability Area(s)
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedServices.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-full bg-white border border-[#EAEAE7] text-[11px] font-semibold text-[#171717]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Client & Business Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#EAEAE7]">
                <div>
                  <span className="block text-[11px] font-mono text-[#8E8E8E] uppercase">
                    Contact Person
                  </span>
                  <span className="text-xs font-bold text-[#171717] block">
                    {details.name}
                  </span>
                  <span className="text-[11px] text-[#6F6F6F] block">
                    {details.phone}
                  </span>
                  <span className="text-[11px] text-[#2C72B2] block">
                    {details.email}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-mono text-[#8E8E8E] uppercase">
                    Business / Brand
                  </span>
                  <span className="text-xs font-bold text-[#171717] block">
                    {details.businessName || "Not specified"}
                  </span>
                  <span className="text-[11px] text-[#2C72B2] font-semibold block">
                    {details.businessType}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#EAEAE7]">
                <div>
                  <span className="block text-[11px] font-mono text-[#8E8E8E] uppercase">
                    Budget Tier
                  </span>
                  <span className="text-xs font-bold text-[#171717]">
                    {budget || "Not specified"}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-mono text-[#8E8E8E] uppercase">
                    Timeline Target
                  </span>
                  <span className="text-xs font-bold text-[#171717]">
                    {timeline || "Not specified"}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#EAEAE7]">
                <span className="block text-[11px] font-mono text-[#8E8E8E] uppercase mb-1">
                  Project Brief
                </span>
                <p className="text-xs text-[#6F6F6F] italic line-clamp-3">
                  &ldquo;{description}&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-[#EAEAE7] flex items-center justify-between gap-3">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            disabled={loading}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold text-[#171717] bg-[#FAFAF8] hover:bg-white border border-[#EAEAE7] transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>
        ) : (
          <div />
        )}

        {currentStep < 6 ? (
          <Button
            type="button"
            onClick={nextStep}
            variant="primary"
            size="sm"
            showArrow={true}
            className="shrink-0"
          >
            Continue
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            variant="primary"
            size="md"
            showArrow={!loading}
            className="shrink-0"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Dispatching...</span>
              </span>
            ) : (
              <>
                <span className="hidden sm:inline">SEND PROJECT REQUEST</span>
                <span className="sm:hidden">SEND REQUEST</span>
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
