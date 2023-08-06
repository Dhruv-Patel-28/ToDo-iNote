import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes)

  // Get all Notes
  const getNotes = async () => {
    // TODO : API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "token-val": localStorage.getItem('auth_token')
      }
    });

    const json = await response.json()

    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO : API call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "token-val": localStorage.getItem('auth_token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    // console.log("Adding a new Note");

    const note = await response.json()
    console.log(note)
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {

    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "token-val": localStorage.getItem('auth_token')
      }
    });

    // eslint-disable-next-line
    const json = await response.json();

    // console.log("Deleting a note wih id : " + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "token-val": localStorage.getItem('auth_token')
      },
      body: JSON.stringify({ id, title, description, tag })
    });
    // eslint-disable-next-line
    const json = await response.json();


    let newNotes = JSON.parse(JSON.stringify(notes))
    // Why can not I write "let newNotes = notes"?

    // Logic to edit in Client
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];

      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
      }
    }

    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;