const Mongoose = require('mongoose');

const UserSessionSchema = new Mongoose.Schema({

    _id: {
        type: String,
        required: true
    },
    registered_sessions: {
        type: [Object],
        default: []
    },
    saved_sessions: {
        type: [Object],
        default: []
    }

});

module.exports = Mongoose.model('UserSession', UserSessionSchema);