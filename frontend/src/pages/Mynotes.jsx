import React, { useState, useEffect } from "react";

const Mynotes = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch notes from backend
  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/notes");
      const data = await res.json();
      setNotes(data.notes || []); // safe fallback
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add or edit note
  const handleAddOrEdit = async () => {
    if (!input) return;

    try {
      if (editId) {
        // Edit note
        const res = await fetch(`http://localhost:3000/api/notes/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ note: input }),
        });
        const data = await res.json();
        setNotes(data.notes || []);
        setInput("");
        setEditId(null);
        setShowInput(false);
      } else {
        // Add note
        const res = await fetch("http://localhost:3000/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ note: input }),
        });
        const data = await res.json();
        setNotes(data.notes || []);
        setInput("");
        setShowInput(false);
      }
    } catch (err) {
      console.error("Error adding/editing note:", err);
    }
  };

  // Delete note
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/notes/${id}`, { method: "DELETE" });
      const data = await res.json();
      setNotes(data.notes || []);
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  // Start editing
  const handleEdit = (note) => {
    setInput(note.note);
    setEditId(note._id); // use _id from MongoDB
    setShowInput(true);
  };

  // Cancel / Back button
  const handleCancel = () => {
    setInput("");
    setEditId(null);
    setShowInput(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Your Notes</h2>
        {!showInput && (
          <button
            onClick={() => setShowInput(true)}
            className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
          >
            + Add Note
          </button>
        )}
      </div>

      {/* Input Box */}
      {showInput && (
        <div className="flex border-2 mb-6 gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your note"
            className="flex-1 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddOrEdit}
            className="bg-blue-500 cursor-pointer text-white px-4 rounded hover:bg-blue-600 transition-colors duration-200"
          >
            {editId ? "Save" : "Add"}
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 cursor-pointer text-white px-4 rounded hover:bg-gray-600 transition-colors duration-200"
          >
            Back
          </button>
        </div>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(notes || []).map((n) => (
          <div
            key={n._id}
            className="p-4 bg-gray-800 text-white rounded shadow hover:bg-gray-700 transition-colors duration-200 min-h-[100px] flex flex-col justify-between"
          >
            <span>{n.note}</span>
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => handleEdit(n)}
                className="text-blue-400 cursor-pointer hover:text-blue-600 font-semibold text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(n._id)}
                className="text-red-400 cursor-pointer hover:text-red-600 font-semibold text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mynotes;
