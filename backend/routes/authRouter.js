import express from "express";
import * as authController from "../controllers/auth-controler.js";
const router = express.Router();
// http://localhost/server/api/auth/register
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/logout", authController.logout);
router.get("/check-session", authController.checkSession);
export default router;