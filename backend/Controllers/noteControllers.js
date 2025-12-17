const { v4: uuidv4 } = require("uuid");
const notes = require("../Models/Note");

// Get all notes
exports.getNotes = (req, res) => {
  res.json({ notes });
};

// Add note
exports.addNote = (req, res) => {
  const { note } = req.body;
  if (!note) {
    return res.status(400).json({ error: "Note content is required" });
  }

  const newNote = { id: uuidv4(), note };
  notes.push(newNote);
  res.json({ message: "Note added successfully", notes });
};

// Update note
exports.updateNote = (req, res) => {
  const { id } = req.params;
  const { note } = req.body;

  const index = notes.findIndex(n => n.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Note not found" });
  }

  notes[index].note = note;
  res.json({ message: "Note updated successfully", notes });
};

// Delete note
exports.deleteNote = (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex(n => n.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Note not found" });
  }

  notes.splice(index, 1);
  res.json({ message: "Note deleted successfully", notes });
};
