import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const VirtualTours = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ MATCHES server.js: app.use('/api/virtualtours', ...)
        const response = await fetch("http://localhost:5000/api/virtualtours/read");
        
        if (!response.ok) {
           throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          const imagesData = data.map((item) => ({
            _id: item._id,
            // ✅ FIX: Use 'images' array from your new schema and fix backslashes
            imagePath: item.images && item.images.length > 0 
                       ? item.images[0].replace(/\\/g, '/') 
                       : '',
            title: item.title || "Untitled Tour", 
          }));
          setImages(imagesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Nav />
      <div className="mt-12 text-center">
        <h1 className="text-4xl font-semibold text-gray-900">Virtual Tours</h1>
      </div>

      {loading ? (
        <div className="text-center mt-20">Loading your tours...</div>
      ) : images.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5">
          {images.map((tour) => (
            <div className="relative rounded-lg overflow-hidden shadow-md" key={tour._id}>
              <Link to={`/view/${tour._id}`}>
                <img
                  src={`http://localhost:5000/${tour.imagePath}`}
                  alt={tour.title}
                  className="w-full h-52 object-cover transition hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 text-white p-4">
                  <p className="text-lg font-semibold">{tour.title}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-20 text-gray-500">
          No virtual Tours found.
        </div>
      )}
    </div>
  );
};

export default VirtualTours;