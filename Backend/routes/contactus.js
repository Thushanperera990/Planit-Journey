const express = require("express");
const router = express.Router();
const ContactUs = require("../models/contactus"); 

// retrieve all contactus
router.route("/read").get(async (req, res) => {
  try {
    const contactList = await ContactUs.find().sort({ createdAt: -1 });
    res.json(contactList);
  } catch (err) {
    res.status(500).json({ status: "Error with get message", error: err.message });
  }
});

// add new contact
router.route("/add").post((req, res) => {
  const { name, email, phone, subject, message } = req.body;
  const newContactUs = new ContactUs({ name, email, phone, subject, message });

  newContactUs.save()
    .then(() => res.json({ message: "Message added successfully!" }))
    .catch((err) => res.status(500).json({ message: "Error adding message" }));
});

// search by name
router.route("/search").get(async (req, res) => {
  const { name } = req.query;
  const query = name ? { name: { $regex: new RegExp(name, "i") } } : {};
  try {
    const contactList = await ContactUs.find(query);
    res.json(contactList);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// delete
router.route("/delete/:id").delete(async (req, res) => {
  try {
    await ContactUs.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "Message deleted" });
  } catch (err) {
    res.status(500).json({ status: "Error deleting", error: err.message });
  }
});

module.exports = router;