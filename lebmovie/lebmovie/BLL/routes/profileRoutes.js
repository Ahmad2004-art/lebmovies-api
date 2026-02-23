// BLL/routes/profileRoutes.js
import express from "express";
import profileManager from "../managers/profileManager.js";

const router = express.Router();

// get user from id
router.get("/:id", async (req, res) => {
  try {
    const user = await profileManager.getProfile(req.params.id);
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
});

// update user info
router.put("/update", async (req, res) => {
  try {
    const { id, email, password, profile_image } = req.body;

    console.log("📩 Profile update request:", req.body);

    const result = await profileManager.updateProfile(id, email, password, profile_image);
    res.status(200).json({
      success: true,
      message: result.message,
      user: result.user,
    });
  } catch (err) {
    console.error("❌ Update error:", err.message);
    res.status(400).json({
      success: false,
      message: err.message || "Update failed",
    });
  }
});

export default router;
