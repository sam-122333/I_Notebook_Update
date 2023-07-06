import NoteItems from "./NoteItems";
import { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const history = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      history("/login");
    } // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
    id: "",
  });
  const updateNote = (currentNote) => {
    // console.log("update works");
    ref.current.click();
    setNote({
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
      id: currentNote._id,
    });
  };

  const handleClick = (e) => {
    // console.log("update the note", note);
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    ref.current.click();
    props.showAlert("Your note is updated successfully", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ display: "none" }}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="etitle">Title</label>
                  <input
                    value={note.etitle}
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="edescription">Desctiption</label>
                  <input
                    value={note.edescription}
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="etag">Tag</label>
                  <input
                    value={note.etag}
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                onClick={handleClick}
                disabled={
                  note.edescription.length < 5 || note.etitle.length < 5
                }
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length === 0 && "no notes to display"}
        </div>
        {notes.map((note, index) => {
          return (
            <NoteItems
              showAlert={props.showAlert}
              note={note}
              index={index}
              updateNote={updateNote}
              key={note._id}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
