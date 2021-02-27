import express from "express";
import bcrypt from "bcrypt";
import { User, validateUser as validate } from "../models/user";
import { handleApiError } from "../utils/handleApiError";
import _ from "lodash";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";
import { Response, Request } from "express";

const router = express.Router();

// GET: All users
router.get("/", async (_, res) => {
  try {
    const users = await User.find().select("- password").sort("username");

    if (!users) return res.status(404).send("No users found");

    res.send(users);
    return true;
  } catch (error) {
    handleApiError(error);
    return false;
  }
});

// GET: Get one user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).send("User not found");

    res.send(user);
    return true;
  } catch (error) {
    handleApiError(error);
    return false;
  }
});

// POST: Register user
router.post("/", async (req, res) => {
  try {
    // Validation
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Destructure
    const { username, password } = req.body;

    // Check if user already exist
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).send("User already registered");

    const salt = await bcrypt.genSalt(10);

    const newUser: any = new User({
      username: username,
      password: await bcrypt.hash(password, salt),
      registerDate: new Date().toJSON(),
    });

    await newUser.save();

    // Create JWT
    const token = newUser.generateAuthToken();
    res
      .header("choicy-auth-token", token)
      .header("access-control-expose-headers", "choicy-auth-token")
      .send(_.pick(newUser, ["_id", "username", "- password"]));

    return true;
  } catch (error) {
    handleApiError(error);
    return false;
  }
});

// UPDATE: Update user
router.put("/:id", async (req, res) => {
  try {
    // Validation
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const salt = await bcrypt.genSalt(10);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, salt),
      },
      { new: true }
    );

    if (!user) return res.status(404).send("User not found");

    res.send(user);
    return true;
  } catch (error) {
    handleApiError(error);
    return false;
  }
});

// DELETE: Delete user
router.delete("/:id", [auth], [admin], async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).send("User not found");

    res.send(user);
    return true;
  } catch (error) {
    handleApiError(error);
    return false;
  }
});

export default router;
