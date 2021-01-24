import Joi from "joi";
import mongoose from "mongoose";
import { ICategory } from "src/types";
import { ChoiceSchema } from "./choice";

export const CategorySchema: mongoose.SchemaDefinitionProperty<ICategory> = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: true,
    },
    choices: {
      type: [ChoiceSchema],
    },
  }
);

export const Category = mongoose.model("Category", CategorySchema);

export const validateCategory = (category: ICategory) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(20).required(),
    choices: Joi.array().items(
      Joi.object({
        _id: Joi.string().required(),
        category: Joi.string().required(),
        title: Joi.string().min(2).max(55).required(),
        proposals: Joi.array()
          .items(
            Joi.object({
              title: Joi.string().min(2).max(20).required(),
              imageUrl: Joi.string().required(),
              choicePercent: Joi.number().min(0).max(100),
            })
          )
          .length(4)
          .required(),
      })
    ),
  });
  return schema.validate(category);
};
