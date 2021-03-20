import { handleApiError } from "./handleApiError";
import fs from "fs";

export const deleteFile = (path: string) => {
  try {
    fs.unlinkSync(path);
  } catch (error) {
    handleApiError(error);
  }
};
