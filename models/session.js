const Mongoose = require('mongoose');

const SessionSchema = new Mongoose.Schema({

    _id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
    
});

module.exports = Mongoose.model('Session', SessionSchema);