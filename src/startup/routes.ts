import express from "express";
import choices from "../routes/choices";
import categories from "../routes/categories";

const routes = (app: any) => {
  app.use(express.json());
  app.use("/api/choices", choices);
  app.use("/api/categories", categories);
};

export default routes;
