import express from "express";
import adminManager from "../managers/adminManager.js";

const router = express.Router();

// ✅ Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminManager.login(email, password);
    res.json({ message: "Admin login successful", admin });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// ✅ Get all movies
router.get("/movies", async (req, res) => {
  try {
    const movies = await adminManager.getMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add new movie
router.post("/movies", async (req, res) => {
  try {
    const id = await adminManager.addMovie(req.body);
    res.json({ message: "Movie added successfully", id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Update movie
router.put("/movies/:id", async (req, res) => {
  try {
    await adminManager.updateMovie(req.params.id, req.body);
    res.json({ message: "Movie updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Delete movie
router.delete("/movies/:id", async (req, res) => {
  try {
    await adminManager.deleteMovie(req.params.id);
    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
