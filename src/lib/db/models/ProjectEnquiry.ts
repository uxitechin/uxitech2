import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProjectEnquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  businessName?: string;
  businessType?: string;
  services: string[];
  description: string;
  budget: string;
  timeline: string;
  status:
    | "new"
    | "contacted"
    | "in_progress"
    | "completed"
    | "closed"
    | "reviewed"
    | "archived";
  createdAt: Date;
  updatedAt: Date;
}

const ProjectEnquirySchema: Schema<IProjectEnquiry> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: "" },
    company: { type: String, trim: true, default: "" },
    businessName: { type: String, trim: true, default: "" },
    businessType: { type: String, trim: true, default: "" },
    services: [{ type: String, required: true }],
    description: { type: String, required: true, trim: true },
    budget: { type: String, required: true },
    timeline: { type: String, required: true },
    status: {
      type: String,
      enum: [
        "new",
        "contacted",
        "in_progress",
        "completed",
        "closed",
        "reviewed",
        "archived",
      ],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

ProjectEnquirySchema.index({ createdAt: -1 });
ProjectEnquirySchema.index({ status: 1 });

export const ProjectEnquiry: Model<IProjectEnquiry> =
  mongoose.models.ProjectEnquiry ||
  mongoose.model<IProjectEnquiry>("ProjectEnquiry", ProjectEnquirySchema);

export default ProjectEnquiry;
