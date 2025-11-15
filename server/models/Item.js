import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  pointOfContact: { type: String, required: true },
  imageUrl: { type: String }, // image optional for Lost, required for Found
  reportType: { type: String, enum: ["lost", "found"], required: true },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  datePosted: { type: Date, default: Date.now }
});

export default mongoose.model("Item", itemSchema);
