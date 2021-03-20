import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync("./uploads");
    }
    callback(null, dir);
  },
  filename: async (_, file, callback) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      let message = new Error(
        `${file.originalname} is invalid. Only accept png/jpeg.`
      );
      return callback(message, file.originalname);
    }

    const filename =
      file.originalname.split(".")[0] +
      "-" +
      Date.now() +
      path.extname(file.originalname);

    callback(null, filename);
  },
});

const uploadFiles = multer({ storage: storage });
export default uploadFiles;
