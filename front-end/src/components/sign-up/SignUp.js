import { useState } from "react";
// import axiosInstance from "../../api";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

const SignUp = () => {
  const baseURL = "http://localhost:8080";

  // to control the state of the input data
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  // to control the error message
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // to handle the change on the input
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // to submit the user information to the database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(baseURL + "/user/register", data);
      navigate("/login");
      console.log(res.message);
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
    <div className="signup_container">
      <div className="signup_form_container">
        <div className="left">
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className="navy_btn">
              Sing in
            </button>
          </Link>
        </div>
        <div className="right">
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className="edit">
              <input
                type="text"
                placeholder="User Name"
                name="userName"
                onChange={handleChange}
                value={data.userName}
                required
                className="input"
              />
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
            </div>
            {error && <div className="error_msg">{error}</div>}
            <button type="submit" className="white_btn">
              Sing Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
