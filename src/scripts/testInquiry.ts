import mongoose from "mongoose";
import { ProjectEnquiry } from "../lib/db/models/ProjectEnquiry";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://uxitechin_db_user:BDK4yjpxdPLKOYAv@cluster0.lhsx2kq.mongodb.net/uxitech?retryWrites=true&w=majority&appName=Cluster0";

async function verifyDb() {
  console.log("Testing inquiry submission to MongoDB...");
  try {
    await mongoose.connect(MONGODB_URI);

    const testEnquiry = await ProjectEnquiry.create({
      name: "Test Founder",
      email: "founder@testenterprise.com",
      phone: "+91 99999 88888",
      company: "Apex Dynamics",
      services: ["Web Application", "AI & Business Automation"],
      description: "Testing end-to-end inquiry submission pipeline for UXI 2.0 digital systems.",
      budget: "₹3,00,000 – ₹8,00,000 (~$3.5k – $10k)",
      timeline: "1 – 2 Months",
      status: "new",
    });

    console.log("Successfully created test enquiry with ID:", testEnquiry._id.toString());

    const retrieved = await ProjectEnquiry.findById(testEnquiry._id);
    if (retrieved && retrieved.name === "Test Founder") {
      console.log("Verified: Test enquiry retrieved successfully from MongoDB Atlas!");
    }

    // Clean up test entry so the production database remains clean
    await ProjectEnquiry.findByIdAndDelete(testEnquiry._id);
    console.log("Cleaned up test entry successfully. Production database is pristine.");
  } catch (error) {
    console.error("Inquiry test error:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

verifyDb();
