import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  client: string;
  category: string;
  services: string[];
  shortDescription?: string;
  description: string;
  challenge: string;
  solution: string;
  build: string;
  result: string;
  technologies: string[];
  images: string[];
  featured: boolean;
  published: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema<IProject> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    client: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    services: [{ type: String, required: true }],
    shortDescription: { type: String, trim: true, default: "" },
    description: { type: String, required: true },
    challenge: { type: String, required: true },
    solution: { type: String, required: true },
    build: { type: String, required: true },
    result: { type: String, required: true },
    technologies: [{ type: String }],
    images: [{ type: String }],
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

ProjectSchema.index({ published: 1, order: 1 });
ProjectSchema.index({ featured: 1, order: 1 });

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
