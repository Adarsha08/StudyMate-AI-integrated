const express = require('express');
const app = express();
const port = 3000;
const cors = require("cors");
const { v4: uuidv4 } = require("uuid"); // unique ids for notes

app.use(cors());
app.use(express.json());

let notes = []; // in-memory notes

// Get all notes
app.get('/api/notes', (req, res) => {
    res.json({ notes });
});

// Add a note
app.post('/api/notes', (req, res) => {
    const { note } = req.body;
    if (!note) return res.status(400).json({ error: "Note content is required" });

    const newNote = { id: uuidv4(), note };
    notes.push(newNote);
    res.json({ message: "Note added successfully", notes });
});

// Edit a note
app.put('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const { note } = req.body;

    const noteIndex = notes.findIndex(n => n.id === id);
    if (noteIndex === -1) return res.status(404).json({ error: "Note not found" });

    notes[noteIndex].note = note;
    res.json({ message: "Note updated successfully", notes });
});

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    notes = notes.filter(n => n.id !== id);
    res.json({ message: "Note deleted successfully", notes });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
