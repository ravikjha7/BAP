const Mongoose = require('mongoose');

const SessionSchema = new Mongoose.Schema({

    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    mentor_name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    registered_users: {
        type: [String],
        default: []
    }
    
});

module.exports = Mongoose.model('Session', SessionSchema);