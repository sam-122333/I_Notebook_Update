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
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-trash mx-2 "
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Your note is delete successfully", "success");
              }}
            ></i>
            <i
              className="fa-light fa-pen-to-square"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <h6 className="card-title">{note.tag}</h6>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItems;
