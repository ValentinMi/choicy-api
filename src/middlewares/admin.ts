import { Response, NextFunction } from "express";
import { RequestWithUser } from "../types";

export default function admin(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  if (process.env.AUTH_REQUIRED === "true" && process.env.ENV !== "PROD")
    return next();

  if (!req.user.isAdmin) return res.status(403).send("Acces denied.");
  next();
}
