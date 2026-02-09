import { Router } from "express";
import { adminLogin } from "../../controllers/user.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { adminLoginSchema } from "../../middleware/schema/user.schema.js";

const router = Router();

router.post("/login", validateRequest(adminLoginSchema), adminLogin);
// router.post("/create-admin", createAdmin);

export default router;
