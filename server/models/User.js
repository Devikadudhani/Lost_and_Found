import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  enrollment: String,
  email: { type: String, unique: true },
  verified: { type: Boolean, default: false },
  googleId: String,
profileComplete: {
  type: Boolean,
  default: false,
},
role: {
  type: String,
  enum: ["user", "admin"],
  default: "user",
},

});

export default mongoose.model("User", userSchema);
