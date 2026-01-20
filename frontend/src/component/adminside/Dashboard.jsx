import React from "react";
import logo from "../../Images/Planit Journey Logo Black Background White Text.png";
import "../CSS/style.css";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css"; 

const Dashboard = () => {
  const handleLogout = () => {
    confirmAlert({
      title: 'Confirm Logout',
      message: 'Are you sure you want to log out of the admin panel?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            localStorage.removeItem("token");
            window.location.href = "/adminlog"; 
          }
        },
        {
          label: 'No',
        }
      ]
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top shadow" style={{ zIndex: "9999" }}>
      <div className="container-fluid px-4">
        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center" to="/admin">
          <img src={logo} alt="Planit Journey Logo" width={70} className="object-contain" />
          <div className="ms-3 border-start ps-3 border-secondary">
             <h1 className="m-0 p-0 text-white fs-5 fw-bold uppercase tracking-tight">Admin</h1>
             <p className="m-0 p-0 text-warning opacity-75" style={{ fontSize: '10px', letterSpacing: '2px' }}>DASHBOARD</p>
          </div>
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#adminNavbar" 
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ADMIN MENU LINKS */}
        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item px-2">
              <Link to="/admin" className="nav-link text-white">Dashboard</Link>
            </li>
            <li className="nav-item px-2">
              <Link to="/alltours" className="nav-link text-white">Tours</Link>
            </li>
            <li className="nav-item px-2">
              <Link to="/AllBlog" className="nav-link text-white">Blogs</Link>
            </li>
            <li className="nav-item px-2">
              <Link to="/addvirtualtour" className="nav-link text-white">Virtual Tours</Link>
            </li>
            <li className="nav-item px-2">
              <Link to="/alltestreview" className="nav-link text-white">Reviews</Link>
            </li>
            <li className="nav-item px-2">
              <Link to="/allcontactus" className="nav-link text-white">Contact</Link>
            </li>
            <li className="nav-item px-2">
              <Link to="/clientsdetails" className="nav-link text-white">Clients</Link>
            </li>
          </ul>

          {/* ACTIONS */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/adminLog" className="btn btn-outline-warning btn-sm fw-bold">
              + ADD ADMIN
            </Link>
            
            <button onClick={handleLogout} className="btn btn-warning px-4 rounded fw-bold text-black">
              LOG OUT
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Dashboard;