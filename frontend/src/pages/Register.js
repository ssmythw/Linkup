import React from "react";
import "../styles/login.css";
import "../styles/main.css";
import image from "../assets/login-image.jpg";

export const Register = () => {
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
          style={{ display: "flex", flexDirection: "column", width: "65%" }}
        >
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Password"
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
      </div>
      <img className="login-image" src={image} alt="" />
    </div>
  );
};
