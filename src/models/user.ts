import Joi from "joi";
import mongoose from "mongoose";
import { IUser } from "../types";
import jwt, { Secret } from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 2,
    maxlength: 25,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
  },
  registerDate: {
    type: Date,
    minlength: 8,
    maxlength: 255,
  },
  isAdmin: Boolean,
});

export const User: any = mongoose.model("User", userSchema);

userSchema.methods.generateAuthToken = function (this: any) {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_PRIVATE_KEY as Secret
  );
  return token;
};

export const validateUser = (user: IUser) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(25).required(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(user);
};
