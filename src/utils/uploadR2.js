import fs from "fs";
import path from "path";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import r2Client from "../config/r2.js";
import { R2_BUCKET, R2_PUBLIC_URL } from "../config/env.js";

const uploadR2 = async (filepath) => {
  try {
    if (!fs.existsSync(filepath)) {
      throw new Error("File not found");
    }
    const fileStream = fs.createReadStream(filepath);
    const fileName = path.basename(filepath);
    const params = {
      Bucket: R2_BUCKET,
      Key: fileName,
      Body: fileStream,
    };
    const command = new PutObjectCommand(params);
    await r2Client.send(command);
    fs.unlinkSync(filepath);
    return `${R2_PUBLIC_URL}/${fileName}`;
  } catch (error) {
    throw new Error(`Failed to upload file to R2: ${error.message}`);
  }
};

export { uploadR2 };
