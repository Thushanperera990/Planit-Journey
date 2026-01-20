const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configure how files are stored
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// The route must handle both "images" and "music" fields
router.post("/", upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'music', maxCount: 1 }
]), async (req, res) => {
    try {
        console.log("Files received:", req.files);
        console.log("Title:", req.body.title);
        
        // Save paths to MongoDB here
        res.status(201).json({ message: "Virtual Tour created successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Server failed to process files" });
    }
});

module.exports = router;