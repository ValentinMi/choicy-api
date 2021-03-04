import express from "express";
import bcrypt from "bcrypt";
import { User, validateUser as validate } from "../models/user";
import { handleApiError } from "../utils/handleApiError";
const router = express.Router();

// Login
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ username: req.body.username });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user!.password
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
