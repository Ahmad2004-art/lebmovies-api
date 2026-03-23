import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import contactManager from "../managers/contactManager.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../../");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(projectRoot, "PL/Public/images"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const imagePath = req.file
      ? `/Public/images/${req.file.filename}`
      : "/Public/images/contact-default.jpg";

    await contactManager.createMessage(name, email, message, imagePath);
    res.json({ success: true, message: "✅ Message received successfully" });
  } catch (err) {
    console.error("❌ Error in contact route:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const data = await contactManager.getAllMessages();
    res.json({ success: true, results: data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await contactManager.deleteMessage(id);
    res.json({ success: true, message: "🗑️ Message deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
