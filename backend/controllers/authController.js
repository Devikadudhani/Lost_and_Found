import User from "../models/user.js";
import Otp from "../models/otp.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtp = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
  });
};

// Signup
export const signup = async (req, res) => {
  const { name, enrollment, email } = req.body;
  if (!email.endsWith("@igdtuw.ac.in"))
    return res.status(400).json({ error: "Use IGDTUW email only" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const user = new User({ name, enrollment, email, verified: false });
    await user.save();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.create({ email, otp, expiry });
    await sendOtp(email, otp);

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Verify Signup
export const verifySignup = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const record = await Otp.findOne({ email, otp });
    if (!record) return res.status(400).json({ error: "Invalid OTP" });
    if (record.expiry < new Date()) return res.status(400).json({ error: "OTP expired" });

    await User.updateOne({ email }, { verified: true });
    await Otp.deleteMany({ email });

    res.json({ message: "Signup verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Login
export const login = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });
    if (!user.verified) return res.status(400).json({ error: "User not verified, check your email for OTP" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.create({ email, otp, expiry });
    await sendOtp(email, otp);

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Verify Login
export const verifyLogin = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const record = await Otp.findOne({ email, otp });
    if (!record) return res.status(400).json({ error: "Invalid OTP" });
    if (record.expiry < new Date()) return res.status(400).json({ error: "OTP expired" });

    await Otp.deleteMany({ email });

    // Generate JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login verified successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
