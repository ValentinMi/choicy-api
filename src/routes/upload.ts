import express, { Request, Response } from "express";
import Joi from "joi";
import { handleApiError } from "../utils/handleApiError";
import auth from "../middlewares/auth";
import upload from "../middlewares/upload";
import { Choice } from "../models/choice";
import { deleteFile } from "../utils/deleteFile";
import { Image } from "../models/image";
import { IImage } from "../types";
import fs from "fs";

const router = express.Router();

const validateBody = (body: { choiceId: string; proposalIdx: number }) => {
  const schema = Joi.object({
    choiceId: Joi.string().required(),
    proposalIdx: Joi.number().min(0).max(3).required(),
  });
  return schema.validate(body);
};

router.post(
  "/",
  [auth],
  [upload.single("file")],
  async (req: Request, res: Response) => {
    try {
      req.body = JSON.parse(JSON.parse(JSON.stringify(req.body)).body);
      if (!req.file) return res.status(400).send("Bad request");

      const { error } = validateBody(req.body);
      if (error) {
        deleteFile(req.file.path);
        return res.status(400).send(error.message);
      }

      const newImg: IImage = new Image({
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype,
      });

      const choice = await Choice.findByIdAndUpdate(req.body.choiceId, {
        $set: {
          [`proposals.${req.body.proposalIdx}.image`]: newImg,
        },
      });
      if (!choice) {
        deleteFile(req.file.path);
        return res.status(400).send("Choice not found");
      }

      deleteFile(req.file.path);

      res.send(req.file);

      return true;
    } catch (error) {
      handleApiError(error);
      return false;
    }
  }
);

export default router;
