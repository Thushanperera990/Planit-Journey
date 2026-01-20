import React from "react";
import logo from "../../Images/Planit Journey Logo Black Background White Text.png";
import "../CSS/style.css";
import { Link } from "react-router-dom";

const Nav = () => {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top shadow" style={{ zIndex: "9999" }}>
      <div className="container">
        {/* LOGO */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Planit Journey Logo Black Background White Text.png" width={80} className="object-contain" />
        </Link>

        {/* MOBILE MENU BUTTON (Hamburger) */}
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

        {/* MENU LINKS */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0"> {/* mx-auto centers the links */}
            <li className="nav-item px-3">
              <Link to="/" className="nav-link text-white text-lg">Home</Link>
            </li>
            <li className="nav-item px-3">
              <Link to="/tours" className="nav-link text-white text-lg">Tour List</Link>
            </li>
            <li className="nav-item px-3">
              <Link to="/virtualtours" className="nav-link text-white text-lg">Virtual Tours</Link>
            </li>
            <li className="nav-item px-3">
              <Link to="/contactUs" className="nav-link text-white text-lg">Contact Us</Link>
            </li>
            <li className="nav-item px-3">
              <Link to="/blogs" className="nav-link text-white text-lg">Blog</Link>
            </li>
            <li className="nav-item px-3">
              <Link to="/reviews" className="nav-link text-white text-lg">Review List</Link>
            </li>
          </ul>

          {/* LOGIN / PROFILE BUTTON */}
          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <Link to="/profile" className="btn btn-warning px-4 rounded fw-bold">
                Profile
              </Link>
            ) : (
              <Link to="/login" className="btn btn-warning px-4 rounded fw-bold">
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;