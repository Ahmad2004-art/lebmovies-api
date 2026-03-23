import express from "express";
import contactAdminManager from "../managers/contactAdminManager.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const data = await contactAdminManager.getAllMessages();
    res.json({ success: true, results: data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await contactAdminManager.deleteMessage(req.params.id);
    res.json({ success: true, message: "🗑️ Message deleted successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post("/reply", async (req, res) => {
  try {
    const { message_id, admin_email, reply_text } = req.body;
    await contactAdminManager.sendReply(message_id, admin_email, reply_text);
    res.json({ success: true, message: "✅ Reply sent successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
