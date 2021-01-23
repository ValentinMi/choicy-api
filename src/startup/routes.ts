import express from "express";
import choices from "../routes/choices";

const routes = (app: any) => {
  app.use(express.json());
  app.use("/api/choices", choices);
};

export default routes;
