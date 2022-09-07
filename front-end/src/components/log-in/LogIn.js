import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./login.css";

const LogIn = () => {
  const baseURL = "http://localhost:8080";
  // to handle the input state
  const [data, setData] = useState({ email: "", password: "" });

  // to handle the error state
  const [error, setError] = useState("");

  // to handle the change in input
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // to submit the user information to login to the system
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(baseURL + "/user/login", data);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="input"
            />
            {error && <div className="error_msg">{error}</div>}
            <button type="submit" className="navy_btn">
              Sing In
            </button>
          </form>
        </div>
        <div className="right">
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className="white_btn">
              Sing Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
