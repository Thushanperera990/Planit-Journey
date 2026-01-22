const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const VirtualTour = require('../models/VirtualTour');

// 1. Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// --- ROUTES ---

// ✅ ROUTE A: GET ALL TOURS (The Gallery)
// This MUST come before the /:id route
router.get("/read", async (req, res) => {
  try {
    const tours = await VirtualTour.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ROUTE B: ADD NEW TOUR (Admin Panel)
router.post("/add", upload.fields([
  { name: 'images', maxCount: 10 }, 
  { name: 'music', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title } = req.body;
    const imagePaths = req.files['images'] ? req.files['images'].map(file => file.path) : [];
    const musicPath = req.files['music'] ? req.files['music'][0].path : null;

    if (imagePaths.length === 0) {
      return res.status(400).json({ error: "At least one image is required." });
    }

    const newTour = new VirtualTour({
      title,
      images: imagePaths,
      music: musicPath
    });

    await newTour.save();
    res.status(201).json(newTour);
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(400).json({ error: err.message });
  }
});

// ✅ ROUTE C: GET SINGLE TOUR (The 360 Viewer)
// This MUST be at the bottom
router.get("/:id", async (req, res) => {
  try {
    const tour = await VirtualTour.findById(req.params.id);
    if (!tour) return res.status(404).json({ error: "Tour not found" });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: "Invalid ID format" });
  }
});

module.exports = router;