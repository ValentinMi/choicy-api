import express, { Application } from "express";
import choices from "../routes/choices";
import categories from "../routes/categories";
import users from "../routes/users";
import auth from "../routes/auth";
import upload from "../routes/upload";

const routes = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/choices", choices);
  app.use("/api/categories", categories);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/upload", upload);
};

export default routes;
