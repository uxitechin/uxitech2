import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import Admin from "@/lib/db/models/Admin";
import { signAdminToken } from "@/lib/auth/jwt";
import { ADMIN_COOKIE_NAME } from "@/lib/auth/session";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    // Check if any admin exists in the database.
    // If not, seed the default administrator account automatically.
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || "AdminPassword123!";
      const defaultEmail = (process.env.DEFAULT_ADMIN_EMAIL || "admin@uxitech.in").toLowerCase();
      const passwordHash = await bcrypt.hash(defaultPassword, 10);
      
      await Admin.create({
        name: "UXI Administrator",
        email: defaultEmail,
        passwordHash,
        role: "superadmin",
      });
      console.log(`[Admin Auth] Seeded initial admin account: ${defaultEmail}`);
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const admin = await Admin.findOne({ email: normalizedEmail });

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Invalid administrative credentials." },
        { status: 401 }
      );
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: "Invalid administrative credentials." },
        { status: 401 }
      );
    }

    // Update last login
    admin.lastLoginAt = new Date();
    await admin.save();

    // Create JWT
    const token = await signAdminToken({
      id: admin._id.toString(),
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    const response = NextResponse.json({
      success: true,
      admin: {
        id: admin._id.toString(),
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      token,
    });

    // Set HTTP-only secure cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("[Admin Login Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to authenticate" },
      { status: 500 }
    );
  }
}
