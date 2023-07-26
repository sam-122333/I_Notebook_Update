import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Login = (props) => {
  const context = useContext(noteContext);
  const { setLoginLogoutSwitch } = context;
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = userDetails;
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        secure: true,
        httpOnly: true,
        withCredentials: true,
        sameSite: "lax",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      localStorage.setItem("loginLogoutSwitch", "true");
      setLoginLogoutSwitch(true);
      history("/home");
      props.showAlert("Congrats! you are logged in successfully", "success");
    } else {
      props.showAlert(
        "Login failed! please try with correct login and password",
        "danger"
      );
    }
  };
  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="mb-5">
        <h2>Login Page</h2>
        <small>Please enter the details for logged in</small>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            onChange={onChange}
            value={userDetails.email}
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={onChange}
            value={userDetails.password}
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
