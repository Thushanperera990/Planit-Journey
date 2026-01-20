import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Home } from 'lucide-react'; // Import Home icon

function AdminSignIn() {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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

        // Role-based redirection
        if (role === "client_mgr") {
          navigate("/clientsdetails");
        } else if (role === "blog_mgr") {
          navigate("/AllBlog");
        } else if (role === "tour_mgr") {
          navigate("/alltours");
        } else {
          navigate("/admin"); 
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.error || "Invalid username or password");
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-50 font-sans">
      
      {/* --- HOME BUTTON --- */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-amber-500 transition-colors group"
      >
        <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
          <Home size={18} />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest">Back to Homepage</span>
      </Link>

      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl border-t-8 border-[#f39c12]"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold uppercase tracking-tighter text-gray-800">Admin Login</h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-2 mb-2"></div>
          <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Portal Management</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-bold mb-2 text-[10px] uppercase tracking-widest">Username</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            placeholder="Admin username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 font-bold mb-2 text-[10px] uppercase tracking-widest">Password</label>
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <div className="text-red-500 bg-red-50 p-3 rounded-md mb-6 text-center text-xs font-bold border border-red-100 uppercase tracking-tight">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className="w-full py-4 bg-[#f39c12] hover:bg-yellow text-black shadow-lg uppercase 
          font-bold tracking-[0.2em] text-xs transition-all transform hover:-translate-y-1"
        >
          Log as Admin
        </button>
      </form>
    </div>
  );
}

export default AdminSignIn;