const router = require("express").Router();
const User = require("../models/user"); 
const Booking = require("../models/bookings");
const bcrypt = require("bcryptjs"); // Use bcryptjs consistently
const jwt = require("jsonwebtoken");

// --- 1. REGISTRATION ---
router.post("/reg", async (req, res) => {
  const { username, password, confirmPassword, email /* other fields */ } = req.body;
  if (password !== confirmPassword) return res.status(400).json({ error: "Passwords match error" });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ success: true, message: "Registered!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 2. LOGIN (Changed from /log to /login to match your frontend) ---
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const validUser = await User.findOne({ username });
    if (!validUser) return res.status(400).json({ error: "User does not exist" });

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) return res.status(400).json({ error: "Password incorrect" });

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET || "fallback_secret");

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
});

// --- 3. OTHER ROUTES (GET, PUT, DELETE) ---
// ... keep your existing GET / and GET /:id routes here ...

module.exports = router;