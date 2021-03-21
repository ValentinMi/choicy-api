import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import { handleApiError } from "../utils/handleApiError";
import Joi from "joi";
import { IUser } from "src/types";
const router = express.Router();

export const validateAuth = (user: IUser) => {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(100).required(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(user);
};

// Login
router.post("/", async (req, res) => {
  try {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user!.password!
    );

    if (!user || !validPassword)
      return res.status(400).send("Invalid email or password");

    const token = user.generateAuthToken();
    res.send(token);
    return true;
  } catch (error) {
    handleApiError(error);
    return false;
  }
});

export default router;
