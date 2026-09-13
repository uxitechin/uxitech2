import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import Testimonial from "@/lib/db/models/Testimonial";
import { seedTestimonials } from "@/lib/db/seedData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    // Auto-seed if empty
    const count = await Testimonial.countDocuments();
    if (count === 0) {
      await Testimonial.insertMany(seedTestimonials);
    }

    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: testimonials,
    });
  } catch (error: any) {
    console.error("[Admin Testimonials GET Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.name || !body.quote) {
      return NextResponse.json(
        { success: false, error: "Client name and quote are required" },
        { status: 400 }
      );
    }

    const newTestimonial = await Testimonial.create({
      ...body,
      published: body.published !== undefined ? body.published : true,
      featured: body.featured !== undefined ? body.featured : false,
      order: body.order !== undefined ? Number(body.order) : 0,
    });

    return NextResponse.json({
      success: true,
      data: newTestimonial,
    });
  } catch (error: any) {
    console.error("[Admin Testimonials POST Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create testimonial" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { _id, id, ...updateData } = body;
    const targetId = _id || id;

    if (!targetId) {
      return NextResponse.json(
        { success: false, error: "Testimonial ID is required" },
        { status: 400 }
      );
    }

    const updated = await Testimonial.findByIdAndUpdate(targetId, updateData, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    console.error("[Admin Testimonials PUT Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await request.json();
        id = body.id || body._id;
      } catch {
        // no body
      }
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Testimonial ID is required" },
        { status: 400 }
      );
    }

    const deleted = await Testimonial.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error: any) {
    console.error("[Admin Testimonials DELETE Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
