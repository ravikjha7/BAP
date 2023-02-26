const Mongoose = require('mongoose');

const SessionUserSchema = new Mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    registered_users: {
        type: [String],
        default: []
    }
});

module.exports = Mongoose.model('SessionUser', SessionUserSchema);