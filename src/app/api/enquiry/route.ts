import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import { ProjectEnquiry } from "@/lib/db/models/ProjectEnquiry";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, services, description, budget, timeline } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide your valid name." },
        { status: 400 }
      );
    }

    if (
      !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!services || !Array.isArray(services) || services.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one project capability." },
        { status: 400 }
      );
    }

    if (!description || typeof description !== "string" || description.trim().length < 5) {
      return NextResponse.json(
        { error: "Please provide a brief description of your project." },
        { status: 400 }
      );
    }

    if (!budget || typeof budget !== "string") {
      return NextResponse.json(
        { error: "Please choose an estimated budget range." },
        { status: 400 }
      );
    }

    if (!timeline || typeof timeline !== "string") {
      return NextResponse.json(
        { error: "Please select an estimated project timeline." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Duplicate submission protection (check for identical email + description in past 2 minutes)
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    const existingSubmission = await ProjectEnquiry.findOne({
      email: email.trim().toLowerCase(),
      createdAt: { $gte: twoMinutesAgo },
    });

    if (existingSubmission) {
      return NextResponse.json(
        {
          success: true,
          message: "Your inquiry has already been received. We will be in touch shortly!",
        },
        { status: 200 }
      );
    }

    const newEnquiry = await ProjectEnquiry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || "").trim(),
      company: (company || "").trim(),
      services,
      description: description.trim(),
      budget: budget.trim(),
      timeline: timeline.trim(),
      status: "new",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your idea is on its way. UXI will be in touch.",
        id: newEnquiry._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error submitting project enquiry:", error);
    return NextResponse.json(
      { error: "Failed to process project request. Please try again or email contact@uxitech.in" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const enquiries = await ProjectEnquiry.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return NextResponse.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error: any) {
    console.error("Error fetching project enquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}
