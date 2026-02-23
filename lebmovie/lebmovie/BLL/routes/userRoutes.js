// BLL/routes/userRoutes.js
import express from "express";
import userManager from "../managers/userManager.js";

const router = express.Router();

// ✅ REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("📩 Register request:", { username, email });

    const result = await userManager.register(username, email, password);

    
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

// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const identifier = email || username;
    console.log("🔐 Login attempt:", { identifier });

    const result = await userManager.login(identifier, password);

    
    res.status(200).json({
      success: true,
      message: result.message,
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

export default router;
