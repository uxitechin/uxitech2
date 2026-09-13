import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import MediaItem from "@/lib/db/models/MediaItem";
import path from "path";
import fs from "fs/promises";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const items = await MediaItem.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({
      success: true,
      data: items,
    });
  } catch (error: any) {
    console.error("[Admin Media GET Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch media" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const altText = (formData.get("altText") as string) || "";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Size limit: 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "File exceeds 10MB size limit" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const originalName = file.name;
    const ext = path.extname(originalName).toLowerCase();
    const baseName = path
      .basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");
    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const filename = `${baseName}-${uniqueSuffix}${ext}`;

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, filename);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    const media = await MediaItem.create({
      filename,
      originalName,
      mimeType: file.type || "application/octet-stream",
      size: file.size,
      url: publicUrl,
      altText: altText || baseName,
    });

    return NextResponse.json({
      success: true,
      data: media,
    });
  } catch (error: any) {
    console.error("[Admin Media POST Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload media" },
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
        { success: false, error: "Media item ID is required" },
        { status: 400 }
      );
    }

    const item = await MediaItem.findById(id);
    if (!item) {
      return NextResponse.json(
        { success: false, error: "Media item not found" },
        { status: 404 }
      );
    }

    // Attempt to delete physical file from public/uploads
    try {
      const filePath = path.join(process.cwd(), "public", "uploads", item.filename);
      await fs.unlink(filePath);
    } catch {
      // File might already have been removed or in cloud storage
    }

    await MediaItem.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Media item deleted successfully",
    });
  } catch (error: any) {
    console.error("[Admin Media DELETE Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete media item" },
      { status: 500 }
    );
  }
}
