import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { connectToDatabase } from "@/lib/db/mongodb";
import Admin from "@/lib/db/models/Admin";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const admin = await Admin.findById(session.id).select("-passwordHash");
    if (!admin) {
      return NextResponse.json({ success: false, error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: admin,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();
    const { name, email, currentPassword, newPassword } = body;

    const admin = await Admin.findById(session.id);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Admin not found" }, { status: 404 });
    }

    if (name?.trim()) admin.name = name.trim();
    if (email?.trim()) {
      const normalized = email.trim().toLowerCase();
      // Check if email taken by someone else
      const existing = await Admin.findOne({ email: normalized, _id: { $ne: admin._id } });
      if (existing) {
        return NextResponse.json(
          { success: false, error: "Email address is already in use by another account" },
          { status: 400 }
        );
      }
      admin.email = normalized;
    }

    // Password change
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { success: false, error: "Current password is required to set a new password" },
          { status: 400 }
        );
      }

      const isMatch = await admin.comparePassword(currentPassword);
      if (!isMatch) {
        return NextResponse.json(
          { success: false, error: "Current password does not match" },
          { status: 400 }
        );
      }

      if (newPassword.length < 8) {
        return NextResponse.json(
          { success: false, error: "New password must be at least 8 characters" },
          { status: 400 }
        );
      }

      admin.passwordHash = await bcrypt.hash(newPassword, 10);
    }

    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Admin profile updated successfully",
      data: {
        id: admin._id.toString(),
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error: any) {
    console.error("[Admin Settings PUT Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update profile" },
      { status: 500 }
    );
  }
}
