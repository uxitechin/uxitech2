import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import SiteContent from "@/lib/db/models/SiteContent";
import { getAdminSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

// Default content fallback definitions
const defaultSiteContent: Record<string, any> = {
  hero: {
    badge: "ENGINEERING DIGITAL SUPREMACY",
    headlinePart1: "WE ENGINEER",
    headlinePart2: "DIGITAL MASTERY",
    subheadline:
      "UXI TECH is a boutique product engineering and strategic design laboratory. We construct high-conversion web ecosystems, intelligent automation pipelines, and iconic digital brand identities.",
    ctaPrimaryText: "EXPLORE WORK",
    ctaPrimaryLink: "/work",
    ctaSecondaryText: "INITIATE PROJECT",
    ctaSecondaryLink: "/contact",
  },
  founder: {
    badge: "FOUNDER & ARCHITECT",
    heading: "BUILT ON PRECISION, OBSESSION, & SCALE",
    quote:
      "We don't build disposable websites or cookie-cutter templates. We engineer long-term technical equity. Every line of code, interaction kinetic, and database schema is crafted to dominate the category.",
    founderName: "B. Uday Kumar",
    founderRole: "Founder & Principal Systems Architect",
    location: "Vijayawada, Andhra Pradesh, India",
  },
  finalCta: {
    badge: "INITIATE ENGAGEMENT",
    title: "READY TO TRANSCEND ORDINARY DIGITAL STANDARDS?",
    subtitle:
      "Reserve an architectural consultation for your next web application, mobile product, or enterprise transformation.",
    ctaText: "LAUNCH PROJECT INITIATIVE",
    ctaLink: "/contact",
  },
  contact: {
    phoneNumbers: ["+91 9391781748", "+91 9959593027", "+91 7330820239"],
    email: "uxitech.in@gmail.com",
    address: "Vijayawada, Andhra Pradesh 520013, India",
  },
};

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section")?.trim().toLowerCase();

    if (section) {
      const record = await SiteContent.findOne({ section }).lean();
      return NextResponse.json({
        success: true,
        section,
        data: record?.data || defaultSiteContent[section] || {},
      });
    }

    // Retrieve all sections
    const records = await SiteContent.find().lean();
    const contentMap: Record<string, any> = { ...defaultSiteContent };

    records.forEach((rec) => {
      contentMap[rec.section] = {
        ...contentMap[rec.section],
        ...rec.data,
      };
    });

    return NextResponse.json({
      success: true,
      data: contentMap,
    });
  } catch (error: any) {
    console.error("[Admin Content GET Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve site content" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    await connectToDatabase();
    const body = await request.json();
    const { section, data } = body;

    if (!section || !data) {
      return NextResponse.json(
        { success: false, error: "Section identifier and data payload are required" },
        { status: 400 }
      );
    }

    const normalizedSection = section.trim().toLowerCase();

    const updated = await SiteContent.findOneAndUpdate(
      { section: normalizedSection },
      {
        section: normalizedSection,
        data,
        updatedBy: session?.email || "admin",
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({
      success: true,
      section: normalizedSection,
      data: updated.data,
    });
  } catch (error: any) {
    console.error("[Admin Content POST Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update site content" },
      { status: 500 }
    );
  }
}
