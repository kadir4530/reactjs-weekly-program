const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 50
    },
    userId: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema);