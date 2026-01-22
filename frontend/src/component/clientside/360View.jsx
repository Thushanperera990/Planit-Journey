import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import SphereViewer from "./SphereViewer";
import Footer from "./Hfotter";
import "../CSS/style.css";

const View = () => {
  const [images, setImages] = useState([]);
  const [musicPath, setMusicPath] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // ✅ FIX 1: Use the new route (/api/virtualtours/)
        const response = await fetch(`http://localhost:5000/api/virtualtours/${id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch tour data");
        }
        
        const data = await response.json();
        console.log("Tour Data received:", data);

        // ✅ FIX 2: Use 'images' instead of 'imagePaths' (matches your new Model)
        // Also fix Windows slashes (\\ to /)
        if (data.images && Array.isArray(data.images)) {
          const cleanedImages = data.images.map(path => path.replace(/\\/g, '/'));
          setImages(cleanedImages);
        }

        // ✅ FIX 3: Use 'music' instead of 'musicPath'
        if (data.music) {
          setMusicPath(data.music.replace(/\\/g, '/'));
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  return (
    <div>
      <Nav />

      <div className="main-container">
        {loading ? (
          <div className="text-center mt-20 text-white">Loading 360° Tour...</div>
        ) : images.length > 0 ? (
          <SphereViewer
            imageUrl={`http://localhost:5000/${images[0]}`}
            imagePaths={images.map((path) => `http://localhost:5000/${path}`)}
            musicPath={musicPath ? `http://localhost:5000/${musicPath}` : ""}
          />
        ) : (
          <div className="text-center mt-20 text-red-500">No images found for this tour.</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default View;