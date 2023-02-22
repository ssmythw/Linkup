import React from "react";
import HomepageImage from "../assets/homepage-image.jpg";
import mountain from "../assets/mountain.jpg";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="container">
      <div className="image-container section1">
        <img src={HomepageImage} alt="" />
        <div className="centered">
          <h1>Link up</h1>
          <Link to="/register">
            <button className="btn btn-primary">Sign Up</button>
          </Link>
        </div>
      </div>
      <div className="section2">
        <div className="section2__left">
          <h1 style={{ textAlign: "center" }}>Connect with the World</h1>
          <p style={{ textAlign: "center" }}>
            Find new networking connections through our app today. Whether you
            are an entrepreneur looking to expand their business conncetions or
            simply an emoloyee looking to grow their netowork, grow it with us.
          </p>
        </div>
        <div className="section2__right">
          <div className="grid">
            <div className="section-card">
              <i
                style={{ fontSize: "2rem" }}
                className="fa fa-address-book"
                aria-hidden="true"
              ></i>
              <p style={{ marginTop: "10px" }}>
                Create your own personal contacts book.{" "}
              </p>
            </div>
            <div className="section-card">
              <i
                style={{ fontSize: "2rem" }}
                className="fa fa-coffee"
                aria-hidden="true"
              ></i>
              <p style={{ marginTop: "10px" }}>
                Connect with anyone from the comfort of your own home.``
              </p>
            </div>
            <div className="section-card">
              <i
                style={{ fontSize: "2rem" }}
                className="fa fa-commenting"
                aria-hidden="true"
              ></i>
              <p style={{ marginTop: "10px" }}>
                Add others to groups or simply network 1 on 1.{" "}
              </p>
            </div>
            <div className="section-card">
              <i
                style={{ fontSize: "2rem" }}
                className="fa fa-code"
                aria-hidden="true"
              ></i>
              <p style={{ marginTop: "10px" }}>
                Find people witht the same work occupation as yourself and watch
                your network grow.
              </p>
            </div>
            <div className="section-card">
              <i
                style={{ fontSize: "2rem" }}
                className="fa fa-graduation-cap"
                aria-hidden="true"
              ></i>
              <p style={{ marginTop: "10px" }}>
                Decide whether you are a student or a mentor. How can you help
                others?
              </p>
            </div>
            <div className="section-card">
              <i
                style={{ fontSize: "2rem" }}
                className="fa fa-handshake-o"
                aria-hidden="true"
              ></i>
              <p style={{ marginTop: "10px" }}>
                Grow your personal brand with us, Link up with anyone across the
                world.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="section3">
        <div className="image-container">
          <img src={mountain} alt="" />
          <div className="centered">
            <h1>Check out our mobile app!</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
