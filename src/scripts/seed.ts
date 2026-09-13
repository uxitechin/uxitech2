import mongoose from "mongoose";
import { Service } from "../lib/db/models/Service";
import { Project } from "../lib/db/models/Project";
import { LabExperiment } from "../lib/db/models/LabExperiment";
import { seedServices, seedProjects, seedLabExperiments } from "../lib/db/seedData";

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

    // Seed Services
    console.log("Seeding services...");
    for (const serviceData of seedServices) {
      await Service.findOneAndUpdate(
        { slug: serviceData.slug },
        serviceData,
        { upsert: true, new: true }
      );
    }
    console.log(`Upserted ${seedServices.length} services.`);

    // Seed Projects
    console.log("Seeding projects...");
    for (const projectData of seedProjects) {
      await Project.findOneAndUpdate(
        { slug: projectData.slug },
        projectData,
        { upsert: true, new: true }
      );
    }
    console.log(`Upserted ${seedProjects.length} projects.`);

    // Seed Lab Experiments
    console.log("Seeding lab experiments...");
    for (const labData of seedLabExperiments) {
      await LabExperiment.findOneAndUpdate(
        { slug: labData.slug },
        labData,
        { upsert: true, new: true }
      );
    }
    console.log(`Upserted ${seedLabExperiments.length} lab experiments.`);

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
