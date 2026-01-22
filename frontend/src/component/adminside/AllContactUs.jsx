import React, { useState, useEffect } from "react";
import axios from "axios";
import AllCResponse from "./AllCResponse";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

function AllContactUs() {
  const [contacts, setContacts] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // 1. Fetch Submissions with the correct /api prefix
  useEffect(() => {
    const getContacts = async () => {
      try {
        // FIXED: Added /api prefix to match server.js
        const response = await axios.get("http://localhost:5000/api/contactus/read");
        
        // Filter out contacts that have already been responded to
        // Note: Ensure your model uses 'responded' or 'response'
        const filteredContacts = response.data.filter(contact => !contact.responded);
        setContacts(filteredContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        alert("Could not load contacts: " + error.message);
      }
    };
    getContacts();
  }, []);

  // 2. Delete Submission with correct /api prefix
  const handleDelete = (id) => {
    const confirmDeletion = window.confirm("Are you sure you want to delete this message?");
    if (confirmDeletion) {
      axios
        .delete(`http://localhost:5000/api/contactus/delete/${id}`)
        .then((res) => {
          if (res.status === 200) {
            setContacts(contacts.filter((contact) => contact._id !== id));
          }
        })
        .catch((err) => {
          console.error(err);
          alert("Error deleting: " + err.message);
        });
    }
  };

  // 3. Export PDF Logic
  const handleExportReport = () => {
    const doc = new jsPDF();
    const tableColumns = ["Name", "Email", "Phone", "Subject", "Message"];
    const tableRows = contacts.map((contact) => [
      contact.name,
      contact.email,
      contact.phone,
      contact.subject,
      contact.message,
    ]);

    const formattedDate = new Date().toLocaleDateString();

    doc.autoTable(tableColumns, tableRows, { startY: 20 });
    doc.text(`Contact Us Report - ${formattedDate}`, 15, 10);
    doc.save(`Contact_Report_${formattedDate}.pdf`);
  };

  return (
    <>
      <Dashboard />
      <div style={{ padding: "80px", paddingTop: "8%" }}>
        <h1 className="font-bold text-4xl mb-5">Contact Us Form Submissions</h1>
        
        <div className="flex justify-between items-center mb-6">
          <p className="font-bold text-2xl text-gray-700">Received Submissions</p>
          
          <div className="flex gap-4">
            {/* Search Bar */}
            <div className="relative flex">
              <input
                type="text"
                placeholder="Search name or email..."
                className={`px-4 py-2 border rounded-l-lg w-64 ${
                  (searchInput.length > 0 && /^[0-9]/.test(searchInput)) ? 'border-red-500' : 'border-gray-300'
                }`}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button className="px-4 bg-amber-500 text-white rounded-r-lg font-semibold hover:bg-amber-600 transition-colors">
                Search
              </button>
            </div>

            <button
              className="px-6 py-2 bg-amber-500 text-white font-bold rounded-md hover:bg-amber-600 transition-colors"
              onClick={handleExportReport}
            >
              Export Report
            </button>
          </div>
        </div>

        {/* Validation Error Messages for Search */}
        {searchInput.length > 0 && /^[0-9]/.test(searchInput) && (
          <p className="text-red-500 text-xs mb-2">Search cannot start with a number</p>
        )}

        {/* Table Section */}
        {contacts.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">Subject</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">Message</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 border-b" colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contacts
                .filter((item) => {
                  const term = searchInput.toLowerCase();
                  return (
                    item.name?.toLowerCase().includes(term) ||
                    item.email?.toLowerCase().includes(term) ||
                    item.subject?.toLowerCase().includes(term)
                  );
                })
                .map((msg) => (
                  <tr key={msg._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm">{msg.name}</td>
                    <td className="px-4 py-4 text-sm text-blue-600">{msg.email}</td>
                    <td className="px-4 py-4 text-sm">{msg.phone}</td>
                    <td className="px-4 py-4 text-sm italic">{msg.subject}</td>
                    <td className="px-4 py-4 text-sm max-w-xs truncate">{msg.message}</td>
                    <td className="px-2 py-4 text-center">
                      <Link to={`/contactus/${msg._id}`}>
                        <button className="px-4 py-1.5 bg-green-500 text-white text-xs font-bold rounded-md hover:bg-green-600 transition-colors">
                          Respond
                        </button>
                      </Link>
                    </td>
                    <td className="px-2 py-4 text-center">
                      <button 
                        className="px-4 py-1.5 bg-red-700 text-white text-xs font-bold rounded-md hover:bg-red-800 transition-colors"
                        onClick={() => handleDelete(msg._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-10 bg-gray-50 border rounded-lg">
            <p className="text-gray-500">No new contact submissions found.</p>
          </div>
        )}

        <div className="mt-12">
          <AllCResponse />
        </div>
      </div>
    </>
  );
}

export default AllContactUs;