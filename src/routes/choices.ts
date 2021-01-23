import express from "express";
import { handleApiError } from "../utils/handleApiError";
import { Choice, validateChoice as validate } from "../models/choice";
const router = express.Router();

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
    const choices = await Choice.find().sort("creationDate");
    if (!choices) return res.status(404).send("Choices not found");

    res.send(choices);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send("Bad request");

    const newChoice = new Choice(req.body);

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

router.delete("/:id", async (req, res) => {
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
