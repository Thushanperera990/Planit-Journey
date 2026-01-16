// Backend/models/UserModel.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true,
    },
    Firstname: {
        type: String,
        required: true,
    },
    Lastname: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    ConfirmPassword: {
        type: String,
        required: true,
    },
    Birthdate: {
        type: String,
        required: true,
    },
    Country: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Phone: {
        type: Number,
        required: true,
    },
    Payments: {
        type: String,
    },
    Trip: {
        type: String,
      
    }
  
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);