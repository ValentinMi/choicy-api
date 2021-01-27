import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const connectDb = () => {
  try {
    const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tftlk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.info("Connected to database...");
  } catch (error) {
    console.error(error.message);
  }
};

export default connectDb;
