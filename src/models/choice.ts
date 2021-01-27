import mongoose from "mongoose";
import Joi = require("joi");
import { IChoice } from "src/types";
import { categorySchema } from "./category";

export const choiceSchema: mongoose.SchemaDefinitionProperty<IChoice> = new mongoose.Schema(
  {
    category: {
      type: categorySchema,
    },
    title: {
      type: String,
      minlength: 2,
      maxlength: 55,
    },
    proposals: {
      type: {
        title: {
          type: String,
          minlength: 2,
          maxlength: 20,
          required: true,
        },
        imageUrl: {
          type: String,
          required: true,
        },
        chosen: {
          type: Number,
          min: 0,
          default: 0,
        },
      },
      length: 4,
      required: true,
    },
    vote: {
      type: Number,
      min: 0,
      default: 0,
    },
  }
);

export const Choice = mongoose.model("Choice", choiceSchema);

export const validateChoice = (choice: IChoice) => {
  const schema = Joi.object({
    categoryId: Joi.string().required(),
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
  });
  return schema.validate(choice);
};
