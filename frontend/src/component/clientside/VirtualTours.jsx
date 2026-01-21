import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const VirtualTours = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/images/all");
        
        // This is the key fix: prevent parsing if response is not JSON
        if (!response.ok) {
           throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();

        // Safety check to ensure data is an array before mapping
        if (Array.isArray(data)) {
          const imagesData = data.map((item) => ({
            _id: item._id,
            imagePath: item.imagePaths && item.imagePaths.length > 0
                ? item.imagePaths[0]
                : item.imagePath,
            title: item.title || "Untitled Tour", 
          }));
          setImages(imagesData);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false); // Stop loading regardless of success/fail
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
          {images.map((image, index) => (
            <div
              className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg"
              key={image._id || index}
            >
              <Link to={`/view/${image._id}`}>
                <img
                  src={`http://localhost:5000/${image.imagePath}`}
                  alt={image.title}
                  className="w-full h-52 object-cover transition duration-300 ease-in-out transform hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 text-white p-4">
                  <p className="text-lg font-semibold">{image.title}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-20 text-gray-500">
          No virtual Tours found. Please check your connection or database.
        </div>
      )}
    </div>
  );
};

export default VirtualTours;