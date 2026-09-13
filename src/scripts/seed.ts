import mongoose from "mongoose";
import { Service } from "../lib/db/models/Service";
import { Project } from "../lib/db/models/Project";
import { Testimonial } from "../lib/db/models/Testimonial";
import { Admin } from "../lib/db/models/Admin";
import { SiteContent } from "../lib/db/models/SiteContent";
import { seedServices, seedProjects, seedTestimonials } from "../lib/db/seedData";
import bcrypt from "bcryptjs";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://uxitechin_db_user:BDK4yjpxdPLKOYAv@cluster0.lhsx2kq.mongodb.net/uxitech?retryWrites=true&w=majority&appName=Cluster0";

async function runSeed() {
  console.log("Connecting to MongoDB for seeding...");
  try {
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    console.log("Successfully connected to MongoDB!");

    // 1. Seed Master Admin
    console.log("Seeding master administrator...");
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const passwordHash = await bcrypt.hash("AdminPassword123!", 10);
      await Admin.create({
        name: "UXI Administrator",
        email: "admin@uxitech.in",
        passwordHash,
        role: "superadmin",
      });
      console.log("Master administrator created: admin@uxitech.in");
    }

    // 2. Seed Services
    console.log("Seeding services...");
    for (const serviceData of seedServices) {
      await Service.findOneAndUpdate(
        { slug: serviceData.slug },
        { ...serviceData, published: true },
        { upsert: true, new: true }
      );
    }
    console.log(`Upserted ${seedServices.length} services.`);

    // 3. Seed Projects
    console.log("Seeding projects...");
    for (const projectData of seedProjects) {
      await Project.findOneAndUpdate(
        { slug: projectData.slug },
        { ...projectData, published: true },
        { upsert: true, new: true }
      );
    }
    console.log(`Upserted ${seedProjects.length} projects.`);

    // 4. Seed Testimonials
    console.log("Seeding testimonials...");
    for (const testData of seedTestimonials) {
      await Testimonial.findOneAndUpdate(
        { name: testData.name, company: testData.company },
        testData,
        { upsert: true, new: true }
      );
    }
    console.log(`Upserted ${seedTestimonials.length} testimonials.`);

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

runSeed();
