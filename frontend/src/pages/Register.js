import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/login.css";
import "../styles/main.css";
import image from "../assets/login-image.jpg";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("linkup-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;

    if (password !== confirmPassword) {
      toast.error(
        "Password and Confirm Password must be the same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be at least 3 characters.", toastOptions);
      return false;
    } else if (password.length < 6) {
      toast.error("Password should be at least 6 characters. ", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <div className="login">
        <h1>Register For Your Account</h1>
        <h4 style={{ color: "grey" }}>Register using Social Media</h4>
        <div className="icons">
          <div className="icon-container facebook">
            <i className="icon fa fa-facebook" aria-hidden="true"></i>
          </div>
          <div className="icon-container google">
            <i className="icon fa fa-google" aria-hidden="true"></i>
          </div>
          <div className="icon-container linkedin">
            <i className="icon fa fa-linkedin" aria-hidden="true"></i>
          </div>
        </div>
        <h6 style={{ color: "grey" }}>OR</h6>
        <form
          onSubmit={(e) => handleSubmit(e)}
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
              name="email"
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Email"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              name="confirmPassword"
              type="password"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Password Confirmation"
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
        <ToastContainer></ToastContainer>
      </div>
      <img className="login-image" src={image} alt="" />
    </div>
  );
};
