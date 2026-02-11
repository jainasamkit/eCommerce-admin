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
import { verifyToken, verifyAdmin } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("", verifyToken, verifyAdmin, getProducts);
router.post(
  "",
  verifyToken,
  verifyAdmin,
  validateRequest(createProductSchema),
  addProduct
);
router.get("/:id", verifyToken, verifyAdmin, getProductById);
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  validateRequest(updateProductSchema),
  updateProduct
);
router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);
export default router;
