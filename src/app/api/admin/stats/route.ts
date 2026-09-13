import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import ProjectEnquiry from "@/lib/db/models/ProjectEnquiry";
import Project from "@/lib/db/models/Project";
import Service from "@/lib/db/models/Service";
import Testimonial from "@/lib/db/models/Testimonial";
import MediaItem from "@/lib/db/models/MediaItem";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    const [
      totalEnquiries,
      newEnquiries,
      totalProjects,
      publishedProjects,
      totalServices,
      publishedServices,
      totalTestimonials,
      publishedTestimonials,
      totalMedia,
      recentEnquiries,
    ] = await Promise.all([
      ProjectEnquiry.countDocuments(),
      ProjectEnquiry.countDocuments({ status: "new" }),
      Project.countDocuments(),
      Project.countDocuments({ published: true }),
      Service.countDocuments(),
      Service.countDocuments({ published: true }),
      Testimonial.countDocuments(),
      Testimonial.countDocuments({ published: true }),
      MediaItem.countDocuments(),
      ProjectEnquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        enquiries: {
          total: totalEnquiries,
          new: newEnquiries,
        },
        projects: {
          total: totalProjects,
          published: publishedProjects,
        },
        services: {
          total: totalServices,
          published: publishedServices,
        },
        testimonials: {
          total: totalTestimonials,
          published: publishedTestimonials,
        },
        media: {
          total: totalMedia,
        },
      },
      recentEnquiries,
    });
  } catch (error: any) {
    console.error("[Admin Stats Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load dashboard metrics" },
      { status: 500 }
    );
  }
}
