import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

function AllCResponse() {
  const [contacts, setContacts] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // 1. Fetching with corrected /api/ path
  useEffect(() => {
    const getContacts = async () => {
      try {
        // FIXED: Added /api prefix
        const response = await axios.get("http://localhost:5000/api/contactus/read");
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        alert("Something went wrong: " + error.message);
      }
    };
    getContacts();
  }, []);

  // 2. Deleting with corrected /api/ path
  const handleDelete = (id) => {
    const confirmDeletion = window.confirm("Are you sure you want to delete this?");
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
          alert("Something went wrong: " + err.message);
        });
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/contactus/${id}`;
  };

  const handleExportReport = () => {
    const doc = new jsPDF();
    const tableColumns = ["Name", "Email", "Phone", "Date", "Subject", "Message", "Response"];
    // Filter only responded contacts for this specific report
    const tableRows = contacts
      .filter(c => c.response)
      .map((contact) => [
        contact.name,
        contact.email,
        contact.phone,
        contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : contact.date,
        contact.subject,
        contact.message,
        contact.response,
      ]);

    const formattedDate = new Date().toLocaleDateString();

    doc.autoTable(tableColumns, tableRows, { startY: 20 });
    doc.text(`Responsed Submissions Report - ${formattedDate}`, 15, 10);
    doc.save(`Responsed_Submissions_Report_${formattedDate}.pdf`);
    window.alert("Report downloaded successfully!");
  };

  const handleSendMail = async (email, name) => {
    try {
      // Note: Ensure your email route is also correctly prefixed in server.js
      await axios.post("http://localhost:5000/api/email/send-mail", {
        name: name,
        email: email,
      });
      alert("Email sent successfully!");
    } catch (error) {
      console.error('Error sending email:', error);
      alert("Failed to send email");
    }
  };

  return (
    <div className="mt-20">
      <div className="flex justify-between items-center mb-4">
        <p className="font-bold text-3xl pb-5">Responsed Submissions</p>
        <div className="flex gap-4">
          <button
            className="w-60 p-2 border bg-amber-500 text-white font-bold rounded-md hover:bg-amber-600 transition-colors"
            onClick={handleExportReport}
          >
            Export Report
          </button>

          <div className="relative flex">
            <input
              type="text"
              placeholder="Search responded..."
              className={`px-4 py-2 border rounded-l-lg flex-1 ${
                (searchInput.length > 0 && /^[0-9]/.test(searchInput)) ||
                (searchInput.length > 0 && /^[^a-zA-Z]/.test(searchInput))
                ? 'border-red-500' : 'border-gray-300'
              }`}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="px-4 font-semibold bg-amber-500 text-white rounded-r-lg hover:bg-amber-700">
              Search
            </button>
          </div>
        </div>
      </div>

      <table className="table table-striped border-2 mt-3 w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Subject</th>
            <th className="p-2 border">Message</th>
            <th className="p-2 border text-green-700">Response</th>
            <th className="p-2 border" colSpan="3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts
            .filter((item) => {
              const term = searchInput.toLowerCase();
              return (
                item.response && ( // Only show items that HAVE a response
                  item.name?.toLowerCase().includes(term) ||
                  item.email?.toLowerCase().includes(term) ||
                  item.subject?.toLowerCase().includes(term) ||
                  item.response?.toLowerCase().includes(term)
                )
              );
            })
            .map((contact) => (
              <tr key={contact._id} className="hover:bg-gray-50">
                <td className="p-2 border text-sm">{contact.name}</td>
                <td className="p-2 border text-sm">{contact.email}</td>
                <td className="p-2 border text-sm">{contact.phone}</td>
                <td className="p-2 border text-sm">
                  {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : contact.date}
                </td>
                <td className="p-2 border text-sm italic">{contact.subject}</td>
                <td className="p-2 border text-sm max-w-xs truncate">{contact.message}</td>
                <td className="p-2 border text-sm font-semibold text-green-600">{contact.response}</td>
                <td className="p-2 border">
                  <button
                    className="p-1 px-3 w-full bg-blue-500 text-white text-xs font-bold rounded hover:bg-blue-600"
                    onClick={() => handleSendMail(contact.email, contact.name)}
                  >
                    Mail
                  </button>
                </td>
                <td className="p-2 border">
                  <button
                    className="p-1 px-3 w-full bg-amber-500 text-white text-xs font-bold rounded hover:bg-amber-600"
                    onClick={() => handleEdit(contact._id)}>
                    Edit
                  </button>
                </td>
                <td className="p-2 border">
                  <button 
                    className="p-1 px-3 w-full bg-red-800 text-white text-xs font-bold rounded hover:bg-red-900" 
                    onClick={() => handleDelete(contact._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllCResponse;