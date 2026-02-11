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
import {
  authenticateAdmin,
  authoriseAdmin,
} from "../../middleware/auth.middleware.js";

const router = Router();

router.use(authenticateAdmin, authoriseAdmin);
router.get("", getProducts);
router.post("", validateRequest(createProductSchema), addProduct);
router.get("/:id", getProductById);
router.put("/:id", validateRequest(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);
export default router;
