const Note = require("../Models/Note"); // Your Mongoose model

// Get all notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // get all notes from DB
    res.json({ notes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add note
exports.addNote = async (req, res) => {
  try {
    const { note } = req.body;
    if (!note) return res.status(400).json({ error: "Note content is required" });

    const newNote = new Note({ note });
    await newNote.save();

    res.json({ message: "Note added successfully", notes: await Note.find() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update note
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(id, { note }, { new: true });
    if (!updatedNote) return res.status(404).json({ error: "Note not found" });

    res.json({ message: "Note updated successfully", notes: await Note.find() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete note
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) return res.status(404).json({ error: "Note not found" });

    res.json({ message: "Note deleted successfully", notes: await Note.find() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
