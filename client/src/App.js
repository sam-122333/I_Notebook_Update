import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

const App = () => {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alertMsg={alert} showAlert={showAlert} />
          <div className="container my-3">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/home" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
};

export default App;
