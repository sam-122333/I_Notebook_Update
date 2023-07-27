import { Link, useLocation } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";

const Navbar = (props) => {
  const context = useContext(noteContext);
  const { loginLogoutSwitch, setLoginLogoutSwitch } = context;
  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      credentials: "include",
    });
    props.showAlert("you have been logged out successfully", "success");
    localStorage.removeItem("loginLogoutSwitch");
    setLoginLogoutSwitch(false);
  };
  let location = useLocation();
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="navbar-brand text-light" to="/">
                  I-Notebook
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link text-${
                    location.pathname === "/home" ? "primary" : "white"
                  } `}
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item ">
                <Link
                  className={`nav-link text-${
                    location.pathname === "/about" ? "primary" : "white"
                  } `}
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>

            {loginLogoutSwitch ? (
              <form className="d-flex">
                <Link
                  onClick={logout}
                  type="button"
                  className="btn btn-primary mx-2"
                  to="/login"
                >
                  Logout
                </Link>
              </form>
            ) : (
              <form action="" className="d-flex">
                <Link
                  type="button"
                  className="btn btn-primary mx-2"
                  to="/signup"
                >
                  Sign Up
                </Link>
                <Link
                  type="button"
                  className="btn btn-primary mx-2"
                  to="/login"
                >
                  Login
                </Link>
              </form>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
