import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import Service from "@/lib/db/models/Service";
import { seedServices } from "@/lib/db/seedData";

export const dynamic = "force-dynamic";

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  try {
    await connectToDatabase();

    // Auto-seed if empty
    const count = await Service.countDocuments();
    if (count === 0) {
      await Service.insertMany(seedServices);
    }

    const services = await Service.find().sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: services,
    });
  } catch (error: any) {
    console.error("[Admin Services GET Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json(
        { success: false, error: "Service title is required" },
        { status: 400 }
      );
    }

    let slug = body.slug?.trim() ? generateSlug(body.slug) : generateSlug(body.title);
    const existing = await Service.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const newService = await Service.create({
      ...body,
      slug,
      published: body.published !== undefined ? body.published : true,
      featured: body.featured !== undefined ? body.featured : false,
      order: body.order !== undefined ? Number(body.order) : 0,
      capabilities: Array.isArray(body.capabilities)
        ? body.capabilities
        : typeof body.capabilities === "string"
        ? body.capabilities.split(",").map((s: string) => s.trim()).filter(Boolean)
        : [],
      technologies: Array.isArray(body.technologies)
        ? body.technologies
        : typeof body.technologies === "string"
        ? body.technologies.split(",").map((s: string) => s.trim()).filter(Boolean)
        : [],
    });

    return NextResponse.json({
      success: true,
      data: newService,
    });
  } catch (error: any) {
    console.error("[Admin Services POST Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create service" },
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
        { success: false, error: "Service ID is required" },
        { status: 400 }
      );
    }

    if (updateData.title && !updateData.slug) {
      updateData.slug = generateSlug(updateData.title);
    } else if (updateData.slug) {
      updateData.slug = generateSlug(updateData.slug);
    }

    if (typeof updateData.capabilities === "string") {
      updateData.capabilities = updateData.capabilities
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);
    }

    if (typeof updateData.technologies === "string") {
      updateData.technologies = updateData.technologies
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);
    }

    const updated = await Service.findByIdAndUpdate(targetId, updateData, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    console.error("[Admin Services PUT Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update service" },
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
        { success: false, error: "Service ID is required" },
        { status: 400 }
      );
    }

    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error: any) {
    console.error("[Admin Services DELETE Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete service" },
      { status: 500 }
    );
  }
}
