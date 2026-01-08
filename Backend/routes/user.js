const router = require("express").Router();
const User = require("../models/user"); // Note: Capitalizing models is a standard convention
const Booking = require("../models/bookings");
const bcrypt = require("bcryptjs"); // Switched to bcryptjs for Windows stability

// --- POST: User Registration ---
router.route("/reg").post(async (req, res) => {
  const {
    username,
    firstname,
    lastname,
    password,
    confirmPassword,
    birthdate,
    country,
    phone,
    email,
    payments,
    trip
  } = req.body;

  // 1. Validation
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords need to be the same" });
  }

  try {
    // 2. Check if username or email exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already associated with an account" });
    }

    // 3. Hash Password (Asynchronous is better for performance)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create New User
    const newUser = new User({
      username,
      firstname,
      lastname,
      password: hashedPassword,
      // Note: We don't save confirmPassword to the database (it's redundant/insecure)
      birthdate,
      country,
      phone,
      email,
      payments,
      trip
    });

    await newUser.save();
    res.status(201).json("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json("Cannot register the user");
  }
});

// --- GET: All users with ongoing tours ---
// Move this ABOVE the /:id route so Express doesn't think "withOngoingTours" is an ID
router.get('/withOngoingTours', async (req, res) => {
  try {
    const users = await User.find();
    const usersWithOngoingTours = await Promise.all(users.map(async (user) => {
      const bookings = await Booking.find({ name: user.username });
      const ongoingTours = bookings.map(booking => booking.tourName);
      return { ...user._doc, ongoing: ongoingTours };
    }));
    res.json(usersWithOngoingTours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- GET: All users ---
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- GET: Single user by ID ---
router.get("/:id", async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(foundUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- PUT: Update user ---
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- DELETE: User by ID ---
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;