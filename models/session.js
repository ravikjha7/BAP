const Mongoose = require('mongoose');

const SessionSchema = new Mongoose.Schema({

    mentor_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
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
        type: Number,
        default: 0
    }
    
});

module.exports = Mongoose.model('Session', SessionSchema);