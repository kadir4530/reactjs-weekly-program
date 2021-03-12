const mongoose = require('mongoose');

const programSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    days: [
        {
            _id: String,
            name: String,
            hour: [
                {
                    _id: String,
                    name: String,
                    activity: {
                        _id: String,
                        name: String
                    }
                }
            ]
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Program', programSchema);