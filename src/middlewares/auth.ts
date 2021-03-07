import { handleApiError } from "../utils/handleApiError";
import jwt, { Secret } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { RequestWithUser } from "../types";

export default function auth(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  if (process.env.AUTH_REQUIRED === "true" && process.env.ENV !== "PROD")
    return next();

  const token = req.header(process.env.HTTP_TOKEN_HEADER);
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_PRIVATE_KEY as Secret
    );
    req.user = decoded;
    next();
  } catch (error) {
    handleApiError(error);
    res.status(400).send("Invalid Token");
  }
}
