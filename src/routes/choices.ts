import express, { Request, Response } from "express";
import { handleApiError } from "../utils/handleApiError";
import { Choice, validateChoice as validate } from "../models/choice";
import { Category } from "../models/category";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";
const router = express.Router();

router.put("/chosen/:id/:proposalIdx", async (req, res) => {
  try {
    const proposalIdx = parseInt(req.params.proposalIdx);
    if (proposalIdx < 0 && proposalIdx > 3)
      return res.status(400).send("Bad request");

    const chosenOne = await Choice.findByIdAndUpdate(
      req.params.id,
      { $inc: { [`proposals.${proposalIdx}.chosen`]: 1, vote: 1 } },
      { new: true }
    );

    if (!chosenOne) return res.status(404).send("Choice not found");

    res.send(chosenOne);
    return true;
  } catch (error) {
    handleApiError(error);
    return false;
  }
});

router.get("/:id", async (req, res) => {
  try {
    const choice = await Choice.findOne({ _id: req.params.id });
    if (!choice) return res.status(404).send("Choice nor found");

    res.send(choice);
    return true;
  } catch (error) {
    handleApiError(error);
    return false;
  }
});

router.get("/", async (_, res) => {
  try {
    const choices = await Choice.find();
    if (!choices) return res.status(404).send("Choices not found");

    res.send(choices);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
});

router.post("/", [auth], [admin], async (req: Request, res: Response) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send("Bad request");

    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send("Invalid category.");

    const newChoice = new Choice({
      category,
      title: req.body.title,
      proposals: req.body.proposals,
    });

    await newChoice.save();

    res.send(newChoice);
    return true;
  } catch (error) {
    handleApiError(error);
    return false;
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send("Bad request");

    const choice = await Choice.findById(req.params._id);
    if (!choice) return res.status(404).send("Choice not found");

    await choice.updateOne(req.body);

    res.send(choice);
    return true;
  } catch (error) {
    handleApiError(error);
    return false;
  }
});

router.delete("/:id", [auth], [admin], async (req: Request, res: Response) => {
  try {
    const choice = await Choice.findByIdAndDelete(req.params.id);
    if (!choice) return res.status(404).send("Choice not found");

    res.send(choice);
    return true;
  } catch (error) {
    handleApiError(error);
    return false;
  }
});

export default router;
