import { Router } from "express"
import { register, login, logout, profile, verifyToken } from "../controllers/auth.controller.js"
import { untenticacionRequerida } from "../middlewares/validateToken.js"
import {validateSchema} from "../middlewares/validator.schema.js"
import { registerSchema, loginSchema } from "../schema/auth.schema.js"

const router = Router();

router.post("/register", validateSchema(registerSchema), register)
router.post("/login", validateSchema(loginSchema), login)
router.post("/logout", logout)
router.get("/verify-token", verifyToken)
router.get("/profile", untenticacionRequerida, profile)

export default router;