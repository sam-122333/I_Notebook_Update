import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = userDetails;
    const response = await fetch("http://localhost:7000/api/auth/createuser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.jwtToken);
      history("/login");
      props.showAlert("Congrats! you are signup successfully", "success");
    } else {
      props.showAlert("Please fill all fields", "danger");
    }
  };
  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <div className="mb-5">
        <h2>Signup Page</h2>
        <small>Please enter the details for Signup</small>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Your Name
          </label>
          <input
            onChange={onChange}
            name="name"
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            name="email"
            required
            minLength={6}
            onChange={onChange}
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            minLength={6}
            required
            name="password"
            onChange={onChange}
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            minLength={6}
            required
            name="cpassword"
            onChange={onChange}
            type="password"
            className="form-control"
            id="cpassword"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
