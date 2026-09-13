import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMediaItem extends Document {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  width?: number;
  height?: number;
  altText?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MediaItemSchema: Schema<IMediaItem> = new Schema(
  {
    filename: { type: String, required: true, unique: true, trim: true },
    originalName: { type: String, required: true, trim: true },
    mimeType: { type: String, required: true, trim: true },
    size: { type: Number, required: true },
    url: { type: String, required: true, trim: true },
    width: { type: Number },
    height: { type: Number },
    altText: { type: String, trim: true, default: "" },
  },
  {
    timestamps: true,
  }
);

MediaItemSchema.index({ createdAt: -1 });

export const MediaItem: Model<IMediaItem> =
  mongoose.models.MediaItem ||
  mongoose.model<IMediaItem>("MediaItem", MediaItemSchema);

export default MediaItem;
