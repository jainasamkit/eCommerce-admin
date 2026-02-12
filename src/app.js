import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import v1router from "./routes/index.js";
import ApiError from "./utils/apiError.js";
import upload from "./middleware/multer.middleware.js";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/error", (req, res) => {
  throw new ApiError.internal("This is a test error");
});

app.post("/upload-multiple", upload.array("files"), (req, res) => {
  // Handle multiple file uploads
  res.send(req.files);
});

app.use("/api/v1", v1router);
app.use((req, res, next) => {
  throw ApiError.notFound("Endpoint not found");
});
app.use(errorHandler);

export default app;
