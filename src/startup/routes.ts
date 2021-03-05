import express, { Application } from "express";
import choices from "../routes/choices";
import categories from "../routes/categories";
import users from "../routes/users";
import auth from "../routes/auth";

const routes = (app: Application) => {
  app.use(express.json());
  app.use("/api/choices", choices);
  app.use("/api/categories", categories);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
};

export default routes;
