import express from "express";
import authManager from "../managers/authManager.js";

const router = express.Router();

// ✅ REGISTER 
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("📩 Register request:", { username, email });

    const result = await authManager.register(username, email, password);

    res.status(201).json({
      success: true,
      message: result.message,
      user: result.user,
    });
  } catch (err) {
    console.error("❌ Register error:", err.message);
    res.status(400).json({
      success: false,
      message: err.message || "Registration failed",
    });
  }
});

// ✅ LOGIN (تسجيل الدخول)
router.post("/login", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const identifier = email || username;

    const result = await authManager.login(identifier, password);

    res.status(200).json({
      success: true,
      message: result.message,
      role: result.role,
      user: result.user,
    });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(401).json({
      success: false,
      message: err.message || "Login failed",
    });
  }
});

// ✅ UPDATE PROFILE 
router.put("/update-profile", async (req, res) => {
  try {
    const { id, email, password, profile_image } = req.body;
    const result = await authManager.updateProfile(id, email, password, profile_image);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (err) {
    console.error("❌ Update profile error:", err.message);
    res.status(400).json({
      success: false,
      message: err.message || "Profile update failed",
    });
  }
});

export default router;
