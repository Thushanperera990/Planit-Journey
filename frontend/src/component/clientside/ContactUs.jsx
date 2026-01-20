import React, { useState } from "react";
import Nav from "./Nav";
import Hfotter from "./Hfotter";
import Img from "../../Images/page-title-bg.png";
import Img1 from "../../Images/phone.png";
import Img2 from "../../Images/mail.png";
import Img3 from "../../Images/location.png";
import axios from "axios";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const headerStyle = {
    width: "100%",
    minHeight: "40vh",
    backgroundImage: `url(${Img})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendData = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8090/contactus/add", form)
      .then(() => {
        toast.success("Message sent successfully!", {
          position: "top-center",
          theme: "dark",
          transition: Bounce,
        });
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      })
      .catch(() => {
        toast.error("Something went wrong", {
          position: "top-center",
          theme: "dark",
          transition: Bounce,
        });
      });
  };

  return (
    <div>
      <Nav />
      <ToastContainer />

      {/* HEADER */}
      <div style={headerStyle}>
        <h1 className="text-4xl font-semibold pt-20">Contact Us</h1>
      </div>

      {/* CONTENT */}
      <table style={{ width: "100%", marginTop: "40px" }}>
        <tbody>
          <tr>
            {/* LEFT INFO */}
            <td style={{ width: "45%", verticalAlign: "top", padding: "30px" }}>
              <table>
                <tbody>
                  <tr>
                    <td style={{ paddingRight: "30px" }}>
                      <img src={Img1} width="110" alt="phone" />
                    </td>
                    <td>
                      <h3 className="text-2xl font-semibold">Phone</h3>
                      <p className="text-lg">+94 12345678</p>
                    </td>
                  </tr>

                  <tr>
                    <td style={{ paddingRight: "30px", paddingTop: "30px" }}>
                      <img src={Img2} width="110" alt="email" />
                    </td>
                    <td style={{ paddingTop: "30px" }}>
                      <h3 className="text-2xl font-semibold">Email</h3>
                      <p className="text-lg">contact@planit-journey.com</p>
                    </td>
                  </tr>

                  <tr>
                    <td style={{ paddingRight: "30px", paddingTop: "30px" }}>
                      <img src={Img3} width="110" alt="address" />
                    </td>
                    <td style={{ paddingTop: "30px" }}>
                      <h3 className="text-2xl font-semibold">Address</h3>
                      <p className="text-lg">
                        No.165/32,Park road,Colombo 08.
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>

            {/* FORM */}
            <td style={{ width: "55%", verticalAlign: "top", padding: "30px" }}>
              <form onSubmit={sendData}>
                <table style={{ width: "100%" }}>
                  <tbody>
                    {[
                      ["Full Name", "name", "text"],
                      ["Email", "email", "email"],
                      ["Phone Number", "phone", "text"],
                      ["Subject", "subject", "text"],
                    ].map(([label, name, type]) => (
                      <tr key={name}>
                        <td style={{ width: "28%", fontWeight: "500" }}>
                          {label}
                        </td>
                        <td style={{ paddingLeft: "25px", paddingBottom: "15px" }}>
                          <input
                            type={type}
                            name={name}
                            value={form[name]}
                            onChange={handleChange}
                            className="w-full border p-2"
                          />
                        </td>
                      </tr>
                    ))}

                    <tr>
                      <td
                        style={{
                          fontWeight: "500",
                          verticalAlign: "top",
                        }}
                      >
                        Message
                      </td>
                      <td style={{ paddingLeft: "25px", paddingBottom: "20px" }}>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          className="w-full border p-3 h-32"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td></td>
                      <td style={{ paddingLeft: "25px" }}>
                        <button
                          type="submit"
                          className="w-full p-3 font-bold"
                          style={{
                            backgroundColor: "#facc15", // yellow
                            color: "#000", // black text
                          }}
                        >
                          Submit Now
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </td>
          </tr>
        </tbody>
      </table>

      <Hfotter />
    </div>
  );
};

export default ContactUs;
