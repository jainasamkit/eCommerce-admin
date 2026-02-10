import { Router } from "express";
import {
  getProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../../controllers/product.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../../middleware/schema/product.schema.js";
import { verifyToken } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", getProducts);
router.post(
  "/add",
  verifyToken,
  validateRequest(createProductSchema),
  addProduct
);
router.get("/:id", getProductById);
router.put(
  "/:id",
  verifyToken,
  validateRequest(updateProductSchema),
  updateProduct
);
router.delete("/:id", verifyToken, deleteProduct);
export default router;
