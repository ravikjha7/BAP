const Mongoose = require('mongoose');

const ScholarshipSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    provider_name: {
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
        type: String,
        required: true
    },
    income: Number,
    amount: {
        type: String,
        required: true
    },
    applied_users: {
        type: Number,
        default: 0
    },
    accepted_users: {
        type: Number,
        default: 0
    },
    rejected_users: {
        type: Number,
        default: 0
    }
});

module.exports = Mongoose.model('Scholarship', ScholarshipSchema);