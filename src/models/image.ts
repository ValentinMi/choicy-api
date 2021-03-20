import mongoose, { Schema } from "mongoose";
import { IImage } from "src/types";

export const imageSchema = new Schema({
  data: Buffer,
  contentType: {
    type: String,
    required: true,
  },
});

export const Image = mongoose.model<IImage>("Image", imageSchema);
