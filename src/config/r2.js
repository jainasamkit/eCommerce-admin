import { S3Client } from "@aws-sdk/client-s3";
import { R2_ACCESS_KEY, R2_SECRET_KEY, R2_ENDPOINT } from "./env.js";

const r2Client = new S3Client({
  endpoint: R2_ENDPOINT,
  region: "auto",
  credentials: {
    accessKeyId: R2_ACCESS_KEY,
    secretAccessKey: R2_SECRET_KEY,
  },
});

export default r2Client;
