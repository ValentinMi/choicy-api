import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import connectDb from "./startup/db";
import routes from "./startup/routes";
const PORT = process.env.PORT;

const app = express();

connectDb();
routes(app);

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
