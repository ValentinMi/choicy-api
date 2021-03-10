import multer from "multer";
import path from "path";

const initMulterStorage = (): multer.StorageEngine => {
  const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, "uploads/");
    },

    filename: (_, file, cb) => {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  return storage;
};

export default initMulterStorage;
