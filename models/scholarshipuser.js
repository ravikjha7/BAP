const Mongoose = require('mongoose');

const ScholarshipUserSchema = new Mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    applied_users: {
        type: [Object],
        default: []
    },
    accepted_users: {
        type: [Object],
        default: []
    },
    rejected_users: {
        type: [Object],
        default: []
    }
});

module.exports = Mongoose.model('ScholarshipUser', ScholarshipUserSchema);