import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/js/src/collapse.js";

const Navigation = () => {
  return (
    <nav
      style={{ zIndex: 1 }}
      className="navbar navbar-expand-lg navbar-dark bg-dark"
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Link Up
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chat">
                Chat
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
