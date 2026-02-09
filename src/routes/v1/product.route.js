import { Router } from "express";
import {
  getProducts,
  addProduct,
} from "../../controllers/product.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { createProductSchema } from "../../middleware/schema/product.schema.js";
const router = Router();

router.get("/", getProducts);
router.post("/add", validateRequest(createProductSchema), addProduct);

export default router;
