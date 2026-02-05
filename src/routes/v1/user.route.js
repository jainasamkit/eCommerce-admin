import { Router } from "express";
import { createAdmin, adminLogin } from "../../controllers/user.controller.js";
const router = Router();

router.post("/login", adminLogin);
// router.post("/create-admin", createAdmin);

export default router;
