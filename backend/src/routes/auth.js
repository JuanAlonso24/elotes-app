import { Router } from "express";
import { registro, login, perfil } from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.post("/registro", registro);
router.post("/login", login);
router.get("/perfil", authMiddleware, perfil); // ruta protegida

export default router;
