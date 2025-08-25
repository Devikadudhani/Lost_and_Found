const express = require("express");
const router = express.Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");

// mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or your SMTP service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 📌 Generate random 6-digit OTP
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 📍 Step 1: Request Verification Code (Signup/Login)
router.post("/request-code", async (req, res) => {
  const { email, name, enrollment } = req.body;

  if (!email.endsWith("@igdtuw.ac.in")) {
    return res.status(400).json({ message: "Only IGDTUW emails allowed" });
  }

  let user = await User.findOne({ email });

  if (!user) {
    user = new User({ name, enrollment, email });
  }

  const code = generateCode();
  user.verificationCode = code;
  user.codeExpiry = Date.now() + 5 * 60 * 1000; // 5 mins
  await user.save();

  // send email
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Verification Code",
    text: `Your OTP is ${code}`,
  });

  res.json({ message: "Verification code sent" });
});

// 📍 Step 2: Verify Code
router.post("/verify-code", async (req, res) => {
  const { email, code } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found" });

  if (user.verificationCode !== code || Date.now() > user.codeExpiry) {
    return res.status(400).json({ message: "Invalid or expired code" });
  }

  user.verified = true;
  user.verificationCode = null;
  user.codeExpiry = null;
  await user.save();

  res.json({ message: "User verified successfully", user });
});

module.exports = router;
