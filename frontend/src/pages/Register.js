import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/login-register.css";
import sideImage from "../assets/login-image.jpg";
import { Link, useNavigate } from "react-router-dom";
import ProfilePic from "../assets/profile-pic.jpg";
import { API_URL } from "../utils/APIRoutes";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

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
    if (!image) {
      toast.error("Please upload a profile picture", toastOptions);
    }
    const url = await uploadImage(image);
    //sign up the user
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "pxtgbgkp");
    try {
      setUploadingImg(true);
      const res = await fetch(API_URL, {
        method: "POST",
        body: data,
      });
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (err) {
      setUploadingImg(false);
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validateImg = (e) => {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      toast.error("Max file size for profile picture is 1mb", toastOptions);
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container">
      {" "}
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
          </div>
          <h6 style={{ color: "grey" }}>OR</h6>
          <form
            onSubmit={(e) => handleSubmit(e)}
            style={{ display: "flex", flexDirection: "column", width: "65%" }}
          >
            <div className="signup-profile-pic__container">
              <img
                className="signup-profile-pic"
                src={imagePreview || ProfilePic}
                alt=""
              />
              <label htmlFor="image-upload" className="image-upload-label">
                <i className="fa fa-plus-circle add-picture-icon"></i>
              </label>
              <input
                type="file"
                id="image-upload"
                hidden
                accept="image/png, image/jpeg"
                onChange={validateImg}
              />
            </div>
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
              {uploadingImg ? "Signing you up..." : "Submit"}
            </button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <ToastContainer></ToastContainer>
        </div>
        <img className="login-image" src={sideImage} alt="" />
      </div>
    </div>
  );
};

export default Register;
