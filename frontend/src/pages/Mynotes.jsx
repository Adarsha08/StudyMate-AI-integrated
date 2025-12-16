import React, { useState, useEffect } from "react";

const Mynotes = () => {
  const [notes, setNotes] = useState([]);   // stores all notes
  const [input, setInput] = useState("");   // input box value

  // Fetch existing notes when component loads
  useEffect(() => {
    fetch("http://localhost:3000/api/notes")
      .then(res => res.json())
      .then(data => {
        // Backend might send { notes: [...] } or just [...]
        if (Array.isArray(data)) {
          setNotes(data);
        } else if (Array.isArray(data.notes)) {
          setNotes(data.notes);
        } else {
          setNotes([]); // fallback
        }
      })
      .catch(err => console.error("Error fetching notes:", err));
  }, []);

  // Add a new note
  const addNote = () => {
    if (!input) return; // prevent empty notes

    fetch("http://localhost:3000/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note: input }),
    })
      .then(res => res.json())
      .then(data => {
        // Backend might send full array or single note
        if (Array.isArray(data)) {
          setNotes(data);
        } else if (Array.isArray(data.notes)) {
          setNotes(data.notes);
        } else if (data.note) {
          // append single note to existing notes
          setNotes(prevNotes => [...prevNotes, data]);
        }
        setInput(""); // clear input
      })
      .catch(err => console.error("Error adding note:", err));
  };

  return (
    <div className="notes-container">
      <h2>StudyMate Notes</h2>

      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your note"
      />
      <button onClick={addNote}>Add Note</button>

      <ul>
        {Array.isArray(notes) && notes.map((n, index) => (
          <li key={index}>{n.note}</li>
        ))}
      </ul>
    </div>
  );
};

export default Mynotes;
