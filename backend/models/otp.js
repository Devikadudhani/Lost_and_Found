import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expiry: Date,
}, { timestamps: true });

export default mongoose.model("Otp", otpSchema);
