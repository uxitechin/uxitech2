import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import { Service } from "@/lib/db/models/Service";
import { seedServices } from "@/lib/db/seedData";

export async function GET() {
  try {
    await connectToDatabase();
    const services = await Service.find({ published: { $ne: false } }).sort({ order: 1 }).lean();
    if (services && services.length > 0) {
      return NextResponse.json({ success: true, count: services.length, data: services });
    }
    return NextResponse.json({ success: true, count: seedServices.length, data: seedServices });
  } catch (error) {
    console.warn("Falling back to seed services data:", error);
    return NextResponse.json({ success: true, count: seedServices.length, data: seedServices });
  }
}
