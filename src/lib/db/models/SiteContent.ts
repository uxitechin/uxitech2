import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteContent extends Document {
  section: string;
  data: Record<string, any>;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SiteContentSchema: Schema<ISiteContent> = new Schema(
  {
    section: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    data: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },
    updatedBy: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

export const SiteContent: Model<ISiteContent> =
  mongoose.models.SiteContent ||
  mongoose.model<ISiteContent>("SiteContent", SiteContentSchema);

export default SiteContent;
