import express from "express";
import Item from "../models/Item.js";
import auth from "../middleware/auth.js";

const router = express.Router();
// GET /api/items?type=lost&q=bottle&page=1&limit=20
// public - lists items, supports search & pagination
router.get("/", async (req, res) => {
  try {
    const { type, q = "", page = 1, limit = 20 } = req.query;
    const pageNum = Math.max(1, Number(page) || 1);
    const perPage = Math.max(1, Number(limit) || 20);
    const skip = (pageNum - 1) * perPage;

    // Build filter based on how items are stored in DB
    // Your POST uses field `reportType` ("lost"|"found"), itemName, description, etc.
    const filter = {};
    if (type === "lost" || type === "found") {
      filter.reportType = type;
    }

    let itemsQuery;
    let total;

    // if q provided, do a case-insensitive regex search on itemName & description
    if (q && q.trim()) {
      const safe = q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(safe, "i");
      itemsQuery = Item.find({
        ...filter,
        $or: [
          { itemName: re },
          { description: re }
        ]
      }).sort({ createdAt: -1 });
      total = await Item.countDocuments({
        ...filter,
        $or: [
          { itemName: re },
          { description: re }
        ]
      });
    } else {
      itemsQuery = Item.find(filter).sort({ createdAt: -1 });
      total = await Item.countDocuments(filter);
    }

    const items = await itemsQuery.skip(skip).limit(perPage).lean();

    // normalize response keys if needed
    res.json({ page: pageNum, limit: perPage, total, items });
  } catch (err) {
    console.error("GET /api/items error:", err);
    res.status(500).json({ message: "Server error while fetching items", error: err.message });
  }
});


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
