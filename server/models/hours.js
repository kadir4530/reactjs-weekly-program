const mongoose = require('mongoose');

const hourSchema = mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 50
    },
    userId: {
        type: [String],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Hour', hourSchema);