const mongoose = require('mongoose');

const virtualTourSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  images: [{ 
    type: String, 
    required: true 
  }], // Array to store multiple 360 image paths
  music: { 
    type: String 
  }, // Path to the audio file
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('VirtualTour', virtualTourSchema);