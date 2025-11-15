import express from "express";
import Item from "../models/Item.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// POST Lost / Found Item
router.post("/report", auth, async (req, res) => {
  try {
    const { 
      itemName, 
      description, 
      location, 
      pointOfContact, 
      imageUrl, 
      reportType 
    } = req.body;

    if (!itemName || !description || !location || !pointOfContact || !reportType) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Found item must have image
    if (reportType === "found" && !imageUrl) {
      return res.status(400).json({ message: "Image is required for found items" });
    }

    const newItem = new Item({
      itemName,
      description,
      location,
      pointOfContact,
      imageUrl,
      reportType,
      reportedBy: req.user.id
    });

    await newItem.save();
    res.status(201).json({ message: "Item reported successfully", item: newItem });

  } catch (err) {
    res.status(500).json({ message: "Server error while reporting item", error: err.message });
  }
});

export default router;
