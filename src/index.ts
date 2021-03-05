import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import connectDb from "./startup/db";
import routes from "./startup/routes";
import initCors from "./startup/cors";
const PORT = process.env.PORT;

const app = express();

initCors(app);
connectDb();
routes(app);

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
