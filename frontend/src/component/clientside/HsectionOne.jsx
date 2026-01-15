import React from "react";
import Img from "../../Images/herobg.jpg";
import { TypeAnimation } from "react-type-animation";
import "react-toastify/dist/ReactToastify.css";

const HsectionOne = () => {
  const addImg = {
    width: "100%",
    height: "120vh",
    backgroundImage: `url(${Img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const fontSize = {
    f0: { fontSize: "3rem", letterSpacing: "8px" },
    f1: { fontSize: "5rem", fontWeight: "bold", letterSpacing: "12px" },
    f2: { fontSize: "1.1rem", letterSpacing: "0.5px" },
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center text-white"
      style={addImg}
    >
      <div className="text-center">
        <div className="p-2 mt-5">
          <h2 style={fontSize.f0}>EXPLORE</h2>
        </div>

        <div className="p-2">
          <TypeAnimation
            sequence={[1500, "THE NEW WORLD", 1000, 8500, ""]}
            style={fontSize.f1}
            repeat={Infinity}
            speed={10}
          />
        </div>

        <div className="p-1">
          <h3 style={fontSize.f2}>
            Discover and book tent camping, RV parks, cabins, treehouses, and glamping.
          </h3>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <a
            href="#!"
            className="btn btn-warning btn-lg px-5 py-3 shadow"
            style={{ borderRadius: '5px', fontWeight: 'bold' }}
          >
            Discover Tours
          </a>
        </div>
      </div>

      {/* Bootstrap Modal Structure */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark">LOGIN</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-dark">
               Login form content goes here...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HsectionOne;