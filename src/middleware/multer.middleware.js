import multer from "multer";
import path from "path";
import ApiError from "../utils/apiError.js";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/temp/");
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(ApiError.badRequest("Only image files are allowed"), false);
  }
};
const baseUpload = multer({
  storage,
  fileFilter,
  // limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const mapMulterError = (error) => {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return ApiError.badRequest("File size exceeds the allowed limit");
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return ApiError.badRequest("Unexpected file field");
    }

    return ApiError.badRequest(error.message);
  }

  return ApiError.badRequest(error.message || "File upload failed");
};

const withMulterErrorHandling = (middleware) => {
  return (req, res, next) => {
    middleware(req, res, (error) => {
      if (error) {
        return next(mapMulterError(error));
      }

      return next();
    });
  };
};

const upload = {
  single: (fieldName) => withMulterErrorHandling(baseUpload.single(fieldName)),
  array: (fieldName, maxCount) =>
    withMulterErrorHandling(baseUpload.array(fieldName, maxCount)),
  fields: (fields) => withMulterErrorHandling(baseUpload.fields(fields)),
  none: () => withMulterErrorHandling(baseUpload.none()),
  any: () => withMulterErrorHandling(baseUpload.any()),
};

export default upload;
