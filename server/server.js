require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const User = require("./models/user");                 // ✅ correct relative path
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// ----- DB connect -----
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err.message));

// ----- Email transporter -----
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// ================== AUTH ==================

// Send OTP
app.post("/api/auth/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.endsWith("@igdtuw.ac.in")) {
      return res.status(400).json({ success: false, message: "Only IGDTUW emails allowed" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    let user = await User.findOne({ email });
    if (!user) user = new User({ email });

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    try {
      await transporter.sendMail({
        from: `IGDTUW Auth <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your OTP Code",
        html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
      });
    } catch (mailErr) {
      return res.status(500).json({ success: false, message: "Failed to send OTP" });
    }

    return res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("send-otp error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Verify OTP (login/signup complete)
app.post("/api/auth/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    if (!user.otp || !user.otpExpiry || user.otp !== otp || Date.now() > user.otpExpiry) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    // clear OTP
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ success: true, message: "OTP verified", token });
  } catch (err) {
    console.error("verify-otp error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Protected example
app.get("/api/auth/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    data: { email: req.user.email, id: req.user.id },
  });
});

// ----- Start server -----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
