import Joi from "joi";
import mongoose, { Schema } from "mongoose";
import { ICategory } from "../types";

export const categorySchema = new Schema({
  title: {
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true,
  },
});

export const Category = mongoose.model<ICategory>("Category", categorySchema);

export const validateCategory = (category: ICategory) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(20).required(),
  });
  return schema.validate(category);
};
