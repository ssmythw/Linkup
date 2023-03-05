import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/js/src/collapse.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const id = Cookies.get("user_id");
  const navigate = useNavigate();

  const logout = () => {
    fetch("http://localhost:8080/users/logout", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      navigate("/");
    });
  };

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
              {id ? (
                <Link className="nav-link" onClick={logout}>
                  Logout
                </Link>
              ) : (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
