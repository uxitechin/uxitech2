import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILabExperiment extends Document {
  title: string;
  slug: string;
  category: "AI" | "3D" | "MOTION" | "AUTOMATION" | "EXPERIMENTAL UI" | "INTERNAL PRODUCTS";
  summary: string;
  description: string;
  interactionType: string;
  technologies: string[];
  status: "active" | "beta" | "concept";
  published: boolean;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const LabExperimentSchema: Schema<ILabExperiment> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["AI", "3D", "MOTION", "AUTOMATION", "EXPERIMENTAL UI", "INTERNAL PRODUCTS"],
    },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    interactionType: { type: String, required: true },
    technologies: [{ type: String }],
    status: {
      type: String,
      enum: ["active", "beta", "concept"],
      default: "active",
    },
    published: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

LabExperimentSchema.index({ published: 1, order: 1 });

export const LabExperiment: Model<ILabExperiment> =
  mongoose.models.LabExperiment ||
  mongoose.model<ILabExperiment>("LabExperiment", LabExperimentSchema);

export default LabExperiment;
