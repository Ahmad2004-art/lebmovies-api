import express from "express";
import moviesManager from "../managers/moviesManager.js";

const router = express.Router();

// ✅ Get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await moviesManager.getAll();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add new movie
router.post("/", async (req, res) => {
  try {
    const id = await moviesManager.add(req.body);
    res.json({ message: "Movie added successfully", id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Update movie
router.put("/:id", async (req, res) => {
  try {
    await moviesManager.update(req.params.id, req.body);
    res.json({ message: "Movie updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Delete movie
router.delete("/:id", async (req, res) => {
  try {
    await moviesManager.remove(req.params.id);
    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
