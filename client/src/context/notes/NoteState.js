import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [loginLogoutSwitch, setLoginLogoutSwitch] = useState(() => {
    const switchValue = localStorage.getItem("loginLogoutSwitch");
    return switchValue === "true";
  });

  //get all note
  const getNotes = async () => {
    // API Call
    const response = await fetch(`/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });
    const json = await response.json();
    setNotes(json);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`/api/notes/addnote`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title, description, tag }),
    });
    let note = await response.json();
    // console.log(note);

    setNotes(notes.concat(note));
    // console.log(notes);
  };

  // Delete a note
  const deleteNote = async (id) => {
    // API Call
    await fetch(`/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);

    // console.log(newNote);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    await fetch(`/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      credentials: "include",
      body: JSON.stringify({ title, description, tag }),
    });

    // Logic to edit the clint

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        loginLogoutSwitch,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        setLoginLogoutSwitch,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
