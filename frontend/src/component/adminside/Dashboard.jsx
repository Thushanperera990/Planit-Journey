import React from "react";
import logo from "../../Images/Planit Journey Logo Black Background White Text.png";
import "../CSS/style.css";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css"; 

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize navigation

  const style = {
    nav: {
      zIndex: "9999",
    },
  };

  // ✅ Function to handle Logout
  const handleLogout = () => {
    confirmAlert({
      title: 'Confirm to Log Out',
      message: 'Are you sure you want to log out of the admin panel?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            localStorage.removeItem("token"); // Clear the token
            navigate("/login"); // Redirect to the client-side login page
          }
        },
        {
          label: 'No',
        }
      ]
    });
  };

  const isLoggedIn = localStorage.getItem("token");

  return (
    <div
      style={style.nav}
      className="Nav w-100 flex justify-between items-center px-5 p-4 bg-black text-gray-100 fixed top-0 left-0 right-0"
    >
      <div className="logo">
        <img className="object-contain" src={logo} alt="logo.png" width={80} />
      </div>

      <div className="menu">
        <ul className="flex justify-between items-center" id="menu">
          <li className="px-4">
            <Link to="/alltours" className="hover:text-yellow-400 text-lg">
              Tours & Destinations
            </Link>
          </li>
          <li className="px-4">
            <Link to="/AllBlog" className="hover:text-yellow-400 text-lg">
              Blogs
            </Link>
          </li>
          <li className="px-4">
            <Link to="/addvirtualtour" className="hover:text-yellow-400 text-lg">
              Virtual Tours
            </Link>
          </li>
          <li className="px-4">
            <Link to="/alltestreview" className="hover:text-yellow-400 text-lg">
              Reviews
            </Link>
          </li>
          <li className="px-4">
            <Link to="/allcontactus" className="hover:text-yellow-400 text-lg">
              Contact Us
            </Link>
          </li>
          <li className="px-4">
            <Link to="/clientsdetails" className="hover:text-yellow-400 text-lg">
              Clients
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex gap-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="side-button w-24 h-12 flex justify-center items-center rounded bg-red-600 hover:bg-red-700 text-white text-lg font-medium transition-colors"
          >
            Log Out
          </button>
        ) : (
          <div className="side-button w-24 h-12 flex justify-center items-center rounded bg-red-600">
            <Link to="/login" className="text-lg p-2">
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;