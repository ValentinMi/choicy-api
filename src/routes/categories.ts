import express, { Request, Response } from "express";
import { Category } from "../models/category";
import { handleApiError } from "../utils/handleApiError";
import { validateCategory as validate } from "../models/category";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send("Category not found");

    res.send(category);
    return true;
  } catch (error) {
    handleApiError(error);
    return false;
  }
});

router.get("/", async (_, res) => {
  try {
    const categories = await Category.find();
    if (!categories) return res.status(404).send("Categories not found");

    res.send(categories);
    return true;
  } catch (error) {
    handleApiError(error);
    return false;
  }
});

router.post("/", [auth], [admin], async (req: Request, res: Response) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send("Bad request");

    const newCategory = new Category(req.body);

    await newCategory.save();

    res.send(newCategory);
    return true;
  } catch (error) {
    handleApiError(error);
    return false;
  }
});

router.put("/:id", [auth], [admin], async (req: Request, res: Response) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send("Bad request");

    const category = await Category.findById(req.params._id);
    if (!category) return res.status(404).send("Category not found");

    await category.updateOne(req.body);

    res.send(category);
    return true;
  } catch (error) {
    handleApiError(error);
    return false;
  }
});

router.delete("/:id", [auth], [admin], async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).send("Category not found");

    res.send(category);
    return true;
  } catch (error) {
    handleApiError(error);
    return false;
  }
});

export default router;
