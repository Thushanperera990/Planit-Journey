import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import updateIcn from "../../Images/refresh.png";
import deleteIcn from "../../Images/trash (1).png";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Dashboard from "./Dashboard";

const AllBlog = () => {
  const [blogsData, setBlogsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBlogsData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/blogs");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setBlogsData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load blogs");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogsData();
  }, []);

  const deleteBlog = async (blogId) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this blog?</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={async () => {
              try {
                const response = await fetch(
                  `http://localhost:5000/blogs/${blogId}`,
                  { method: "DELETE" }
                );
                if (!response.ok) throw new Error("Failed to delete blog");
                setBlogsData(blogsData.filter((b) => b._id !== blogId));
                toast.success("Blog deleted successfully");
              } catch (error) {
                console.error(error);
                toast.error("Failed to delete blog");
              }
            }}
            style={{
              backgroundColor: "green",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            No
          </button>
        </div>
      </div>,
      { position: "top-center", autoClose: false, closeOnClick: true }
    );
  };

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const generateReport = () => {
    const filteredData = blogsData.filter((blog) =>
      blog.Title.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    const doc = new jsPDF();

    const columns = [
      { header: "Title", dataKey: "Title" },
      { header: "Author", dataKey: "Author" },
      { header: "Category", dataKey: "Category" },
      { header: "Content", dataKey: "Content" },
      { header: "Excerpt", dataKey: "Excerpt" },
      { header: "Publish Date", dataKey: "PublishDate" },
    ];

    const rows = filteredData.map((blog) => ({
      Title: blog.Title,
      Author: blog.Author,
      Category: blog.Category,
      Content: blog.Content,
      Excerpt: blog.Excerpt,
      PublishDate: formatDate(blog.PublishDate),
    }));

    autoTable(doc, { columns, body: rows });
    doc.save("filtered_data.pdf");
  };

  return (
    <>
      <Dashboard />
      <div style={{ paddingTop: "10%", paddingLeft: "2%", paddingRight: "2%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: "30px", paddingBottom: "20px" }}>
            All Blog Details
          </p>
          <div>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={handleSearch}
              style={{ marginRight: "10px" }}
            />
            <button
              style={{
                backgroundColor: "blue",
                color: "white",
                padding: "6px 12px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={generateReport}
            >
              Generate Report
            </button>
          </div>
        </div>
        <Link to="/AddBlog">
          <button
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "6px 12px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            ADD
          </button>
        </Link>
        {loading ? (
          <p>Loading blogs...</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {blogsData
                .filter((blog) =>
                  blog.Title.toLowerCase().includes(searchTerm.trim().toLowerCase())
                )
                .map((blog, index) => (
                  <tr key={blog._id}>
                    <th>{index + 1}</th>
                    <td>{blog.Title}</td>
                    <td>{blog.Author}</td>
                    <td>{blog.Category}</td>
                    <td>
                      <Link to={`/UpdateBlog/${blog._id}`}>
                        <img
                          src={updateIcn}
                          alt="Update"
                          style={{ width: "20px", height: "20px", cursor: "pointer" }}
                        />
                      </Link>
                    </td>
                    <td>
                      <img
                        src={deleteIcn}
                        alt="Delete"
                        style={{ width: "20px", height: "20px", cursor: "pointer" }}
                        onClick={() => deleteBlog(blog._id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default AllBlog;

