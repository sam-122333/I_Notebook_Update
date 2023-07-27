import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
const NoteItems = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, index, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-2">
        <div className="card-body">
          <small>S.N.- {index + 1}</small>
          <div className="d-flex align-items-center">
            <h5 className="card-title">
              <span style={{ color: "red", fontWeight: "bold" }}>Title:-</span>{" "}
              {note.title}
            </h5>
          </div>
          <h6 className="card-title">
            <span style={{ color: "red", fontWeight: "bold" }}>Tag:-</span>{" "}
            {note.tag}
          </h6>
          <p className="card-text">
            <span style={{ color: "red", fontWeight: "bold" }}>
              Description:-
            </span>{" "}
            {note.description}
          </p>
          <div
            className="btn-group btn-group-sm"
            role="group"
            aria-label="Small button group"
          >
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => {
                updateNote(note);
              }}
            >
              edit
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Your note is delete successfully", "success");
              }}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItems;
