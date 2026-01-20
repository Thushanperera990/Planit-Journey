import React, { useState, useEffect } from "react";
import axios from "axios";
import { Mail, Calendar, User, Trash2, MessageSquare, Search, CheckCircle, Clock } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  // 1. READ ALL MESSAGES
  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/contacts/read");
      setMessages(response.data);
    } catch (error) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  // 2. SEARCH MESSAGES (Using your /search?name= route)
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/contacts/search?name=${searchTerm}`);
      setMessages(response.data);
    } catch (error) {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // 3. DELETE MESSAGE (Using your /delete/:id route)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await axios.delete(`http://localhost:5000/api/contacts/delete/${id}`);
        setMessages(messages.filter((msg) => msg._id !== id));
        toast.success("Message deleted");
      } catch (error) {
        toast.error("Error deleting message");
      }
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans text-black">
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-tighter">Inbox</h1>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Contact Us Management</p>
          </div>

          <form onSubmit={handleSearch} className="flex items-center bg-white border border-gray-200 px-4 py-2 shadow-sm w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search by name..." 
              className="bg-transparent outline-none text-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit"><Search size={16} className="text-gray-400" /></button>
          </form>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20">
            <div className="animate-spin h-8 w-8 border-2 border-amber-500 border-t-transparent rounded-full mb-4"></div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Fetching Data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {messages.length > 0 ? messages.map((msg) => (
              <div key={msg._id} className="bg-white border-l-4 border-amber-500 shadow-sm p-6 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-amber-600 font-bold uppercase">
                      {msg.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{msg.name}</h3>
                      <p className="text-xs text-gray-400">{msg.email}</p>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  {msg.responded ? (
                    <span className="flex items-center gap-1 text-[10px] font-black uppercase text-green-600 bg-green-50 px-2 py-1">
                      <CheckCircle size={12} /> Responded
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-1">
                      <Clock size={12} /> Pending
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Subject: {msg.subject || "No Subject"}</p>
                  <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-4 italic">
                    "{msg.message}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                    <Calendar size={14} />
                    {new Date(msg.createdAt || Date.now()).toLocaleDateString()}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleDelete(msg._id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                      title="Delete Inquiry"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button className="bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-amber-500 transition-colors">
                      Send Response
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 bg-white border border-dashed">
                <p className="text-gray-400 uppercase text-xs font-bold">No inquiries found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;