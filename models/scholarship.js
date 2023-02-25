const Mongoose = require('mongoose');

const ScholarshipSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categories: {
        type: [String]
    },
    description: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        enum: ['female', 'male', 'transgender']
    },
    course: String,
    branch: String,
    deadline: {
        type: Date,
        required: true
    },
    income: Number,
    amount: {
        type: String,
        required: true
    },
    applied_users: [Object],
    accepted_users: [Object],
    rejected_users: [Object]
});

module.exports = Mongoose.model('Scholarship', ScholarshipSchema);