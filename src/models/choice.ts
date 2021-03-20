import mongoose, { Schema } from "mongoose";
import Joi = require("joi");
import { IChoice } from "../types";
import { categorySchema } from "./category";
import { imageSchema } from "./image";

export const choiceSchema = new Schema({
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
      image: {
        type: imageSchema,
        required: false,
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
});

export const Choice = mongoose.model<IChoice>("Choice", choiceSchema);

export const validateChoice = (choice: IChoice) => {
  const schema = Joi.object({
    categoryId: Joi.string().required(),
    title: Joi.string().min(2).max(55).required(),
    proposals: Joi.array()
      .items(
        Joi.object({
          title: Joi.string().min(2).max(20).required(),
          image: Joi.required(),
          choicePercent: Joi.number().min(0).max(100),
        })
      )
      .length(4)
      .required(),
  });
  return schema.validate(choice);
};
