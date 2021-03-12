const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 50
    },
    email: {
        type: String,
    },
    password: {
        type: String, 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);