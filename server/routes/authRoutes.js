import express from "express";
import { signup, verifySignup, login, verifyLogin, verifyOtp } from "../controllers/authController.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// OTP routes
router.post("/send-otp", signup);
router.post("/signup", signup);
router.post("/verify-signup", verifySignup);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/verify-login", verifyLogin);

//
// GOOGLE AUTH ROUTES
//

// Step 1: Start Google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Step 2: Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  async (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // If profile incomplete → go to form
    if (!user.profileComplete) {
      return res.redirect(
        `lost-and-found-nu-rouge.vercel.app/complete-profile?token=${token}`
      );
    }

    // If profile already complete → login success
    res.redirect(
      `lost-and-found-nu-rouge.vercel.app/login-success?token=${token}`
    );
  }
);

// Step 3: Complete profile
router.post("/complete-profile", auth, async (req, res) => {
  try {
    const { name, enrollment } = req.body;

    const user = await User.findById(req.user.id);

    user.name = name;
    user.enrollment = enrollment;
    user.profileComplete = true;

    await user.save();

    res.json({ message: "Profile completed" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-__v");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
