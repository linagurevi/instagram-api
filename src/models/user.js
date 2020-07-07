const mongoose = require('mongoose');

const User = new mongoose.model('User', {
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    avatar: String,
    
    createdAt: {
        type: Date,
        defualt: () => new Date()
    }
});

module.exports = User;