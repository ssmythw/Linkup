import React, { useState } from "react";
import "../styles/login-register.css";
import image from "../assets/login-image.jpg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
    }
  };

  const handleValidation = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Username is required.", toastOptions);
      return false;
    }
    if (password === "") {
      toast.error("Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="login-container">
        <div className="login">
          <h1 style={{ marginBottom: "10px" }}>Login to Your Account</h1>
          <h4 style={{ color: "grey" }}>Login using Social Media</h4>
          <div className="icons">
            <div className="icon-container facebook">
              <i className="icon fa fa-facebook" aria-hidden="true"></i>
            </div>
            <div className="icon-container google">
              <i className="icon fa fa-google" aria-hidden="true"></i>
            </div>
          </div>
          <h6 style={{ color: "grey" }}>OR</h6>
          <form
            style={{ display: "flex", flexDirection: "column", width: "65%" }}
          >
            <div className="form-group">
              <input
                name="username"
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Username"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                name="password"
                type="password"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Username"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button
              style={{ width: "300px", margin: "15px auto" }}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
        <img className="login-image" src={image} alt="" />
      </div>
    </div>
  );
};

export default Login;
