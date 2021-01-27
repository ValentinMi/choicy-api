import cors from "cors";
import { Application } from "express";

const initCors = (app: Application) => {
  app.use(cors());
};

export default initCors;
