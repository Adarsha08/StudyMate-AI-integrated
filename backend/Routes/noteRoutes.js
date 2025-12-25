// Routes/noteRoutes.js
const express = require("express");
const router = express.Router();
const Note = require("../Models/Note");
const authMiddleware = require("../Middleware/authMiddleware");

// Apply authentication middleware to all note routes to ensure only logged-in users can access
router.use(authMiddleware);

// Get notes for logged-in user
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json({ notes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add note
router.post("/", async (req, res) => {
  try {
    const { note } = req.body;
    const newNote = new Note({ note, user: req.userId });
    await newNote.save();
    const notes = await Note.find({ user: req.userId });
    res.json({ notes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update note (only if belongs to user)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, user: req.userId },
      { note },
      { new: true }
    );

    if (!updatedNote) return res.status(404).json({ error: "Note not found" });

    const notes = await Note.find({ user: req.userId });
    res.json({ notes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete note (only if belongs to user)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findOneAndDelete({ _id: id, user: req.userId });
    if (!deletedNote) return res.status(404).json({ error: "Note not found" });

    const notes = await Note.find({ user: req.userId });
    res.json({ notes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
