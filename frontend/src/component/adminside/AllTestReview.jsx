import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Dashboard";

function AllTestReview() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/testreview/read");
        setReviews(response.data);
      } catch (error) {
        console.log("Error fetching reviews:", error);
        alert("Something went wrong: " + error);
      }
    };
    getReviews();
  }, []);

  const handleDelete = (id) => {
    const confirmDeletion = window.confirm("Are you sure you want to delete this?");
    if (confirmDeletion) {
      axios
        .delete(`http://localhost:5000/testreview/delete/${id}`)
        .then((res) => {
          if (res.status === 200) {
            setReviews(reviews.filter((review) => review._id !== id));
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong: " + err);
        });
    }
  };

  const handleEdit = (id) => {
    const reviewToEdit = reviews.find((review) => review._id === id);
    setSelectedReview(reviewToEdit);
  };

  const handleUpdate = (id) => {
    const confirmUpdate = window.confirm("Are you sure you want to update this?");
    if (confirmUpdate) {
      axios
        .put(`http://localhost:5000/testreview/update/${id}`, selectedReview)
        .then((res) => {
          if (res.status === 200) {
            const updatedReviews = reviews.map((review) =>
              review._id === id ? selectedReview : review
            );
            setReviews(updatedReviews);
            setSelectedReview(null);
            toast.success("Review updated successfully!");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong: " + err);
        });
    }
  };

  const handleExportReport = () => {
    const doc = new jsPDF();
    const tableColumns = ["Full Name", "Email", "Review", "Date", "Destination"];
    const tableRows = reviews.map((review) => [
      review.fullName,
      review.email,
      review.review,
      review.date,
      review.destination,
    ]);

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    autoTable(doc, { head: [tableColumns], body: tableRows, startY: 20 });
    doc.text(`Reviews Report - ${formattedDate}`, 15, 10);
    doc.save(`Reviews Report - ${formattedDate}.pdf`);

    // Optional: Show toast instead of alert
    toast.success("Report downloaded successfully!");
  };

  return (
    <>
      <Dashboard />
      <ToastContainer position="top-right" autoClose={3000} />
      <div style={{ padding: "80px", paddingTop: "10%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontWeight: "bold", fontSize: "30px", paddingBottom: "20px" }}>Review Submissions</p>
          <button
            className="mt-1 w-60 p-2 border bg-amber-500 text-white font-bold rounded-md"
            onClick={handleExportReport}
          >
            Export Report
          </button>

          <div className="relative flex">
            <input
              type="text"
              placeholder="Search..."
              className={`px-4 py-2 border rounded-l-lg flex-1 ${
                searchInput.length > 0 && !/^[a-zA-Z]/.test(searchInput)
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchInput.length > 0 && !/^[a-zA-Z]/.test(searchInput) && (
              <p className="text-red-500 text-sm mt-1 absolute left-0 bottom-full">
                Search term must start with a letter
              </p>
            )}
            <button className="px-4 font-semibold bg-amber-500 text-white rounded-r-lg hover:bg-amber-700">
              Search
            </button>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Review</th>
              <th>Date</th>
              <th>Destination</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reviews
              .filter((reviewItem) => {
                const searchTerm = searchInput.toLowerCase();
                return (
                  reviewItem.fullName.toLowerCase().includes(searchTerm) ||
                  reviewItem.email.toLowerCase().includes(searchTerm) ||
                  reviewItem.review.toLowerCase().includes(searchTerm) ||
                  reviewItem.destination.toLowerCase().includes(searchTerm)
                );
              })
              .map((review) => (
                <tr key={review._id}>
                  <td>
                    {selectedReview?._id === review._id ? (
                      <input
                        className="px-4 py-2 border rounded-l-lg flex-1"
                        value={selectedReview.fullName}
                        onChange={(e) => setSelectedReview({ ...selectedReview, fullName: e.target.value })}
                      />
                    ) : (
                      review.fullName
                    )}
                  </td>
                  <td>
                    {selectedReview?._id === review._id ? (
                      <input
                        className="px-4 py-2 border rounded-l-lg flex-1"
                        value={selectedReview.email}
                        onChange={(e) => setSelectedReview({ ...selectedReview, email: e.target.value })}
                      />
                    ) : (
                      review.email
                    )}
                  </td>
                  <td>
                    {selectedReview?._id === review._id ? (
                      <textarea
                        className="px-4 py-2 border rounded-l-lg flex-1 w-full"
                        value={selectedReview.review}
                        onChange={(e) => setSelectedReview({ ...selectedReview, review: e.target.value })}
                      />
                    ) : (
                      review.review
                    )}
                  </td>
                  <td>
                    {selectedReview?._id === review._id ? (
                      <input
                        className="px-4 py-2 border rounded-l-lg flex-1"
                        value={selectedReview.date}
                        onChange={(e) => setSelectedReview({ ...selectedReview, date: e.target.value })}
                      />
                    ) : (
                      review.date
                    )}
                  </td>
                  <td>
                    {selectedReview?._id === review._id ? (
                      <input
                        className="px-4 py-2 border rounded-l-lg flex-1"
                        value={selectedReview.destination}
                        onChange={(e) => setSelectedReview({ ...selectedReview, destination: e.target.value })}
                      />
                    ) : (
                      review.destination
                    )}
                  </td>
                  <td>
                    {selectedReview?._id === review._id ? (
                      <>
                        <button
                          className="mt-1 p-2 w-full border bg-green-600 text-white font-bold rounded-lg"
                          onClick={() => handleUpdate(review._id)}
                        >
                          Update
                        </button>
                        <button
                          className="mt-1 p-2 w-full border bg-red-800 text-white font-bold rounded-lg"
                          onClick={() => setSelectedReview(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className="mt-1 p-2 w-full border bg-blue-600 text-white font-bold rounded-lg"
                        onClick={() => handleEdit(review._id)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="mt-1 p-2 w-full border bg-red-800 text-white font-bold rounded-lg"
                      onClick={() => handleDelete(review._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AllTestReview;
