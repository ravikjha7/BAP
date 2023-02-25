const Mongoose = require('mongoose');

const UserScholarshipSchema = new Mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    applied_scholarships: {
        type: [Object],
        default: []
    },
    accepted_scholarships: {
        type: [Object],
        default: []
    },
    rejected_scholarships: {
        type: [Object],
        default: []
    },
    all_scholarships: {
        type: [Object],
        default: []
    },
    saved_scholarships: {
        type: [Object],
        default: []
    },
});

module.exports = Mongoose.model('UserScholarship', UserScholarshipSchema);