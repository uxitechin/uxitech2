import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import Project from "@/lib/db/models/Project";
import { seedProjects } from "@/lib/db/seedData";

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
    const count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany(seedProjects);
    }

    const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (error: any) {
    console.error("[Admin Projects GET Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch projects" },
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
        { success: false, error: "Project title is required" },
        { status: 400 }
      );
    }

    let slug = body.slug?.trim() ? generateSlug(body.slug) : generateSlug(body.title);

    // Check slug uniqueness
    const existing = await Project.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const newProject = await Project.create({
      ...body,
      slug,
      published: body.published !== undefined ? body.published : true,
      featured: body.featured !== undefined ? body.featured : false,
      order: body.order !== undefined ? Number(body.order) : 0,
      technologies: Array.isArray(body.technologies)
        ? body.technologies
        : typeof body.technologies === "string"
        ? body.technologies.split(",").map((s: string) => s.trim()).filter(Boolean)
        : [],
      services: Array.isArray(body.services)
        ? body.services
        : typeof body.services === "string"
        ? body.services.split(",").map((s: string) => s.trim()).filter(Boolean)
        : [],
      images: Array.isArray(body.images)
        ? body.images
        : typeof body.images === "string" && body.images.trim()
        ? [body.images.trim()]
        : [],
    });

    return NextResponse.json({
      success: true,
      data: newProject,
    });
  } catch (error: any) {
    console.error("[Admin Projects POST Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create project" },
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
        { success: false, error: "Project ID is required" },
        { status: 400 }
      );
    }

    if (updateData.title && !updateData.slug) {
      updateData.slug = generateSlug(updateData.title);
    } else if (updateData.slug) {
      updateData.slug = generateSlug(updateData.slug);
    }

    if (typeof updateData.technologies === "string") {
      updateData.technologies = updateData.technologies
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);
    }

    if (typeof updateData.services === "string") {
      updateData.services = updateData.services
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);
    }

    if (typeof updateData.images === "string") {
      updateData.images = updateData.images.trim() ? [updateData.images.trim()] : [];
    }

    const updated = await Project.findByIdAndUpdate(targetId, updateData, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    console.error("[Admin Projects PUT Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update project" },
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
        { success: false, error: "Project ID is required" },
        { status: 400 }
      );
    }

    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error: any) {
    console.error("[Admin Projects DELETE Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete project" },
      { status: 500 }
    );
  }
}
