import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import { Project } from "@/lib/db/models/Project";
import { seedProjects } from "@/lib/db/seedData";

export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();
    if (projects && projects.length > 0) {
      return NextResponse.json({ success: true, count: projects.length, data: projects });
    }
    return NextResponse.json({ success: true, count: seedProjects.length, data: seedProjects });
  } catch (error) {
    console.warn("Falling back to seed projects data:", error);
    return NextResponse.json({ success: true, count: seedProjects.length, data: seedProjects });
  }
}
