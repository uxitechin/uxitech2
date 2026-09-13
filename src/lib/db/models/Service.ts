import mongoose, { Schema, Document, Model } from "mongoose";

export interface IServiceProcess {
  step: string;
  title: string;
  description: string;
}

export interface IService extends Document {
  title: string;
  slug: string;
  category: "BUILD" | "INTELLIGENCE" | "SYSTEMS" | "IDENTITY" | "GROWTH" | "EDUCATION";
  tagline: string;
  description: string;
  whatItSolves: string;
  whatUxiBuilds: string;
  capabilities: string[];
  process: IServiceProcess[];
  technologies: string[];
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceProcessSchema = new Schema<IServiceProcess>(
  {
    step: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const ServiceSchema: Schema<IService> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["BUILD", "INTELLIGENCE", "SYSTEMS", "IDENTITY", "GROWTH", "EDUCATION"],
    },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    whatItSolves: { type: String, required: true },
    whatUxiBuilds: { type: String, required: true },
    capabilities: [{ type: String, required: true }],
    process: [ServiceProcessSchema],
    technologies: [{ type: String }],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

ServiceSchema.index({ category: 1, order: 1 });

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
