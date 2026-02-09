import { Router } from "express";
import userRoutes from "./v1/user.route.js";
import productRoutes from "./v1/product.route.js";
const router = Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);

export default router;
