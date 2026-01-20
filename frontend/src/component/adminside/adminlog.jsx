import React, { useState } from 'react';
import axios from 'axios';

function AdminSignIn() {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/admins/login", {
        username,
        password,
      });

      if (response.data.message === "Success") {
        const role = response.data.role;

        // --- PROPER ROLE-BASED REDIRECTION ---
        if (role === "client_mgr") {
          window.location.href = "/clientsdetails";
        } else if (role === "blog_mgr") {
          window.location.href = "/AllBlog";
        } else if (role === "tour_mgr") {
          window.location.href = "/alltours";
        } else if (role === "admin") {
          window.location.href = "/admin"; // Dashboard
        } else {
          // Default redirect for other managers
          window.location.href = "/admin"; 
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.error || "Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl border-t-8 border-[#f8c12a] shake2"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-800">Admin Login</h2>
          <p className="text-gray-500 text-sm">Planit Journey Management Portal</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2 text-xs uppercase">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2 text-xs uppercase">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <div className="text-red-500 bg-red-50 p-2 rounded mb-4 text-center text-sm border border-red-100">
            {error}
          </div>
        )}

        <button type="submit" className="btn-yellow w-full py-3 shadow-md uppercase font-bold tracking-widest">
          Login to Dashboard
        </button>
      </form>
    </div>
  );
}

export default AdminSignIn;