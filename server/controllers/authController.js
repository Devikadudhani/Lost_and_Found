import User from "../models/User.js";
import Otp from "../models/Otp.js";
import sendOtp from "../utils/sendOtp.js";
import { generateToken } from "../utils/generateToken.js";

// Generate random 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Signup - send OTP
export const signup = async (req, res) => {
  try {
    const { name, enrollment, email } = req.body;

    if (!email.endsWith("@igdtuw.ac.in")) {
      return res.status(400).json({ error: "Use college email only" });
    }

    let user = await User.findOne({ email });
    if (!user) user = await User.create({ name, enrollment, email });

    const otp = generateOTP();
    await Otp.create({ email, otp });
    await sendOtp(email, otp);

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verify Signup OTP
export const verifySignup = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email, otp });
    if (!record) return res.status(400).json({ error: "Invalid or expired OTP" });

    const user = await User.findOneAndUpdate({ email }, { verified: true }, { new: true });
    const token = generateToken(user);

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login - send OTP
export const login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email, verified: true });
    if (!user) return res.status(400).json({ error: "User not found or not verified" });

    const otp = generateOTP();
    await Otp.create({ email, otp });
    await sendOtp(email, otp);

    res.json({ message: "OTP sent for login" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verify Login OTP
export const verifyLogin = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = await Otp.findOne({ email, otp });
    if (!record) return res.status(400).json({ error: "Invalid or expired OTP" });

    const user = await User.findOne({ email });
    const token = generateToken(user);

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
