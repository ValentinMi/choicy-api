import express from "express";
import * as dotenv from "dotenv";
import connectDb from "./startup/db";
import routes from "./startup/routes";
import initCors from "./startup/cors";
import path from "path";
dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.static(path.resolve("./uploads")));

initCors(app);
connectDb();
routes(app);

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
