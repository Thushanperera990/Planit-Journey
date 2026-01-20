// Backend/server.js

// 1. Load environment variables from .env file
require('dotenv').config(); 

// 2. Import core modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 3. Initialize Express app and define connection details
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// 4. Set up Middleware
app.use(cors());           
app.use(express.json());   

// 5. Database Connection (Mongoose)
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 6. Route Middleware

// Import all routes (ONLY ONCE EACH)
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const tourRoutes = require('./routes/tours'); 
const blogRoutes = require('./routes/blogs'); 
const virtualTourRoutes = require('./routes/virtualtours');
const destinationRoutes = require('./routes/destinations'); 
const testReviewRoutes = require('./routes/testreview'); 

// Connect the routes to the app
app.use('/api/users', userRoutes);
app.use('/admins', adminRoutes);
app.use('/tours', tourRoutes); 
app.use('/blogs', blogRoutes);
app.use('/addvirtualtour', virtualTourRoutes);
app.use('/destinations', destinationRoutes);
app.use('/testreview', testReviewRoutes); 

// 7. Basic Test Route
app.get('/', (req, res) => {
  res.send('Planit Journey API Status: Running and ready for development.');
});

// 8. Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});