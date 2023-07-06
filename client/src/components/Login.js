import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:7000/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: userDetails.email,
        password: userDetails.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.jwtToken);
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
