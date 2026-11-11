import React, { useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  // Add a note
  const addNote = () => {
    if (input === "") return;
    setNotes([...notes, { id: Date.now(), text: input }]);
    setInput(""); 
  };

  // Delete a note
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Update a note
  const updateNote = (id) => {
    const newText = prompt("Edit your note:");
    if (newText !== null && newText !== "") {
      setNotes(notes.map((note) => {
        if (note.id === id) {
          return { ...note, text: newText };
        }
        return note;
      }));
    }
  };

  return (
    <div className="app-container">
      <h1>My React Notes App</h1>
      
      <div className="input-section">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Write a new note..." 
        />
        <button onClick={addNote}>Add Note</button>
      </div>

      <ul className="notes-list">
        {notes.map((note) => (
          <li key={note.id}>
            <span>{note.text}</span>
            <div>
              <button onClick={() => updateNote(note.id)}>Edit</button>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;