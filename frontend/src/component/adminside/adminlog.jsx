import React, { useState } from "react";
import axios from "axios";

const AddUserForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/admins/reg", {
        username,
        password,
        role,
      });

      // If backend returns { message: "Admin added successfully" }
      alert("✅ Success: " + (response.data.message || response.data));
      
      setUsername("");
      setPassword("");
      setRole("");
    } catch (error) {
      console.error("Error adding user:", error);
      // Access the specific error message from your backend
      const errorMsg = error.response?.data?.error || "An error occurred";
      alert("❌ Error: " + errorMsg);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl border-t-8 border-[#f8c12a] shake2"
      >
        <h2 className="text-2xl font-extrabold mb-6 text-center uppercase tracking-wider text-gray-800">
          Add New Admin
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-xs font-bold mb-2 uppercase tracking-widest">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8c12a]"
            placeholder="Enter username"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xs font-bold mb-2 uppercase tracking-widest">
            Temporary Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8c12a]"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-xs font-bold mb-2 uppercase tracking-widest">
            Assign Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8c12a] bg-white"
            required
          >
            <option value="" disabled>Select Role</option>
            <option value="tour_mgr">Tour Manager</option>
            <option value="client_mgr">Client Manager</option>
            <option value="blog_mgr">Blog Manager</option>
            <option value="review_mgr">Review Manager</option>
            <option value="care_mgr">Care Manager</option>
            <option value="vtour_mgr">Vtour Manager</option>
          </select>
        </div>

        {/* Using your custom brand button class */}
        <button type="submit" className="btn-yellow w-full py-3">
          Create Admin Account
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;