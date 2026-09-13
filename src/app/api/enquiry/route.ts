import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import connectToDatabase from "@/lib/db/mongodb";
import { ProjectEnquiry } from "@/lib/db/models/ProjectEnquiry";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      company,
      businessName,
      businessType,
      services,
      description,
      budget,
      timeline,
    } = body;

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

    const finalBusinessName = (businessName || company || "").trim();
    const finalBusinessType = (businessType || "").trim();
    const finalPhone = (phone || "").trim();

    const newEnquiry = await ProjectEnquiry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: finalPhone,
      company: finalBusinessName,
      businessName: finalBusinessName,
      businessType: finalBusinessType,
      services,
      description: description.trim(),
      budget: budget.trim(),
      timeline: timeline.trim(),
      status: "new",
    });

    // Send email notification to uxitech.in@gmail.com via Resend
    if (resend) {
      try {
        await resend.emails.send({
          from: "UXI TECH <onboarding@resend.dev>",
          to: ["uxitech.in@gmail.com"],
          replyTo: email.trim().toLowerCase(),
          subject: `🚀 New Project Inquiry: ${name.trim()} (${finalBusinessName || "Client"})`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0F172A; color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #1E293B;">
              <div style="background: linear-gradient(135deg, #090E17 0%, #1E3A8A 100%); padding: 32px 24px; border-bottom: 1px solid #1E293B;">
                <span style="display: inline-block; padding: 4px 10px; background-color: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 20px; font-size: 11px; font-weight: bold; color: #38BDF8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">New Client Lead</span>
                <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px;">NEW PROJECT INQUIRY</h1>
                <p style="margin: 6px 0 0; color: #94A3B8; font-size: 13px;">Submitted via uxi.tech project initiation wizard</p>
              </div>

              <div style="padding: 24px; background-color: #0B1120;">
                <h2 style="font-size: 12px; font-weight: 700; color: #38BDF8; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 14px 0;">Contact & Business Details</h2>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 6px 0; color: #94A3B8; font-size: 13px; width: 140px;">Client Name:</td>
                    <td style="padding: 6px 0; color: #FFFFFF; font-size: 14px; font-weight: 600;">${name.trim()}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #94A3B8; font-size: 13px;">Phone Number:</td>
                    <td style="padding: 6px 0; color: #38BDF8; font-size: 14px; font-weight: 600;">
                      <a href="tel:${finalPhone}" style="color: #38BDF8; text-decoration: none;">${finalPhone || "Not provided"}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #94A3B8; font-size: 13px;">Email Address:</td>
                    <td style="padding: 6px 0; color: #FFFFFF; font-size: 14px; font-weight: 600;">
                      <a href="mailto:${email.trim().toLowerCase()}" style="color: #38BDF8; text-decoration: none;">${email.trim().toLowerCase()}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #94A3B8; font-size: 13px;">Business Name:</td>
                    <td style="padding: 6px 0; color: #FFFFFF; font-size: 14px; font-weight: 600;">${finalBusinessName || "Individual / Not specified"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #94A3B8; font-size: 13px;">Business Type:</td>
                    <td style="padding: 6px 0; color: #FFFFFF; font-size: 14px; font-weight: 600;">${finalBusinessType || "Not specified"}</td>
                  </tr>
                </table>

                <h2 style="font-size: 12px; font-weight: 700; color: #38BDF8; text-transform: uppercase; letter-spacing: 1px; margin: 20px 0 14px 0; border-top: 1px solid #1E293B; padding-top: 16px;">Project Scope</h2>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 6px 0; color: #94A3B8; font-size: 13px; width: 140px;">Capabilities:</td>
                    <td style="padding: 6px 0; color: #FFFFFF; font-size: 13px; font-weight: 600;">${services.join(", ")}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #94A3B8; font-size: 13px;">Estimated Budget:</td>
                    <td style="padding: 6px 0; color: #34D399; font-size: 14px; font-weight: 700;">${budget.trim()}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #94A3B8; font-size: 13px;">Timeline Target:</td>
                    <td style="padding: 6px 0; color: #FFFFFF; font-size: 13px; font-weight: 600;">${timeline.trim()}</td>
                  </tr>
                </table>

                <h2 style="font-size: 12px; font-weight: 700; color: #38BDF8; text-transform: uppercase; letter-spacing: 1px; margin: 20px 0 10px 0; border-top: 1px solid #1E293B; padding-top: 16px;">Project Brief</h2>
                <div style="background-color: #1E293B; border-left: 3px solid #38BDF8; padding: 14px 16px; border-radius: 8px; font-size: 13px; line-height: 1.6; color: #E2E8F0; white-space: pre-wrap;">${description.trim()}</div>
              </div>

              <div style="background-color: #090E17; padding: 18px 24px; border-top: 1px solid #1E293B; text-align: center; font-size: 12px; color: #64748B;">
                UXI TECH · Autonomous Systems, Engineering & Digital Growth<br>
                Vijayawada, Andhra Pradesh 520013
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Resend delivery failed:", emailErr);
      }
    } else {
      console.log("RESEND_API_KEY is not configured. Saved enquiry to database, email dispatch skipped.");
    }

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
      { error: "Failed to process project request. Please try again or email uxitech.in@gmail.com" },
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
