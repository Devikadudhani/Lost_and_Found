import express from "express";
import vision from "@google-cloud/vision";
import Item from "../models/Item.js";
import upload from "../middleware/upload.js";

const router = express.Router();

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_VISION_KEY_PATH || "./google-vision-key.json",
});
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file?.path;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image required" });
    }

    const [result] = await client.labelDetection(imageUrl);

    const labels =
      result.labelAnnotations?.map((label) =>
        label.description.toLowerCase()
      ) || [];

    const regex = labels.join("|");

    const items = await Item.find({
      $or: [
        { itemName: { $regex: regex, $options: "i" } },
        { description: { $regex: regex, $options: "i" } },
        { location: { $regex: regex, $options: "i" } }
      ]
    }).limit(20);

    res.json({ items, labels });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Image search failed" });
  }
});

export default router;