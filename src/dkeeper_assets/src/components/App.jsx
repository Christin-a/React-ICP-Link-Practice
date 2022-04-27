import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {dkeeper} from "../../../declarations/dkeeper";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      dkeeper.createNote(newNote.title, newNote.content)// call function from dfx to send new note from frontend to backend
      return [newNote, ...prevNotes];
    });
  }

  useEffect(() => { // useEffect is triggered every time a react app renders
    console.log("useEffect is triggered")
    fetchData(); // once the app renders it calls the fetchData function
  }, []);

  async function fetchData() {
    const notesArray = await dkeeper.readNotes(); //waits for the readNotes function to be called 
    setNotes(notesArray); // updates the notes array with new notes
  };

  function deleteNote(id) {
  dkeeper.removeNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
