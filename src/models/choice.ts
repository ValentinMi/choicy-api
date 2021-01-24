import mongoose from "mongoose";
import Joi = require("joi");
import { IChoice } from "src/types";

export const ChoiceSchema = new mongoose.Schema({
  category: {
    type: String,
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
      choicePercent: {
        type: Number,
        min: 0,
        max: 100,
      },
    },
    length: 4,
    required: true,
  },
});

export const Choice = mongoose.model("Choice", ChoiceSchema);

export const validateChoice = (choice: IChoice) => {
  const schema = Joi.object({
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
  });
  return schema.validate(choice);
};
