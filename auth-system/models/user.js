const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  enrollment: { type: String },
  email: { type: String, required: true, unique: true },
  verified: { type: Boolean, default: false },
  verificationCode: { type: String }, // store OTP temporarily
  codeExpiry: { type: Date } // expiry time of OTP
});

module.exports = mongoose.model("User", userSchema);
