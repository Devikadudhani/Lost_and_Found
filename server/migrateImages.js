import mongoose from "mongoose";
import Item from "./models/Item.js";
import cloudinary from "./config/cloudinary.js";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const items = await Item.find();

for (const item of items) {

  if (item.imageUrl && item.imageUrl.startsWith("data:image")) {

    console.log("Uploading image for item:", item._id);

    const upload = await cloudinary.uploader.upload(item.imageUrl, {
      folder: "lost-and-found"
    });

    item.imageUrl = upload.secure_url;

    await item.save();

    console.log("Converted:", item._id);
  }
}

console.log("Migration finished");

process.exit();