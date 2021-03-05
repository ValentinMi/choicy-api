import Joi from "joi";
import mongoose from "mongoose";
import { ICategory } from "../types";

export const categorySchema: mongoose.SchemaDefinitionProperty<ICategory> = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: true,
    },
  }
);

export const Category: mongoose.Model<
  mongoose.Document<ICategory>
> = mongoose.model("Category", categorySchema);

export const validateCategory = (category: ICategory) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(20).required(),
  });
  return schema.validate(category);
};
