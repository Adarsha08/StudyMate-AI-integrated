const Note = require("../Models/Note");

// GET notes (only logged-in user's notes)
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json({ notes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD note
exports.addNote = async (req, res) => {
  try {
    const newNote = new Note({
      note: req.body.note,
      user: req.userId,
    });

    await newNote.save();
    const notes = await Note.find({ user: req.userId });
    res.json({ notes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE note
exports.updateNote = async (req, res) => {
  try {
    const updated = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { note: req.body.note },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Note not found" });

    const notes = await Note.find({ user: req.userId });
    res.json({ notes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE note
exports.deleteNote = async (req, res) => {
  try {
    const deleted = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deleted) return res.status(404).json({ error: "Note not found" });

    const notes = await Note.find({ user: req.userId });
    res.json({ notes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

