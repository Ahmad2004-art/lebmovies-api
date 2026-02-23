import express from "express";
import adminPanelManager from "../../BLL/managers/adminPanelManager.js";

const router = express.Router();

// ✅ Get all (users or admins)
router.get("/:type", async (req, res) => {
  try {
    const { type } = req.params;
    if (type !== "users" && type !== "admins") {
      return res.status(400).json({ success: false, message: "❌ Invalid type (use 'users' or 'admins')" });
    }

    const data = await adminPanelManager.getAll(type);
    res.json({ success: true, results: data });
  } catch (err) {
    console.error("❌ Error fetching all:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Get by ID
router.get("/:type/:id", async (req, res) => {
  try {
    const { type, id } = req.params;
    if (type !== "users" && type !== "admins") {
      return res.status(400).json({ success: false, message: "❌ Invalid type" });
    }

    const data = await adminPanelManager.getById(type, id);
    res.json({ success: true, result: data });
  } catch (err) {
    console.error("❌ Error fetching by ID:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Create new record
router.post("/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const { username, email, password } = req.body;
    if (type !== "users" && type !== "admins") {
      return res.status(400).json({ success: false, message: "❌ Invalid type" });
    }

    const result = await adminPanelManager.create(type, username, email, password);
    res.json({ success: true, message: "✅ Created successfully", user: result });
  } catch (err) {
    console.error("❌ Error creating record:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Update record
router.put("/:type/:id", async (req, res) => {
  try {
    const { type, id } = req.params;
    const { username, email, password } = req.body;
    if (type !== "users" && type !== "admins") {
      return res.status(400).json({ success: false, message: "❌ Invalid type" });
    }

    await adminPanelManager.update(type, id, username, email, password);
    res.json({ success: true, message: "✅ Updated successfully" });
  } catch (err) {
    console.error("❌ Error updating record:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Delete record
router.delete("/:type/:id", async (req, res) => {
  try {
    const { type, id } = req.params;
    if (type !== "users" && type !== "admins") {
      return res.status(400).json({ success: false, message: "❌ Invalid type" });
    }

    await adminPanelManager.delete(type, id);
    res.json({ success: true, message: "🗑️ Deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting record:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ لازم يكون في النهاية
export default router;
