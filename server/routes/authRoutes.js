import express from "express";
import { signup, verifySignup, login, verifyLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-signup", verifySignup);
router.post("/login", login);
router.post("/verify-login", verifyLogin);

export default router;
