const Mongoose = require('mongoose');

const ScholarshipSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    gender: {
        type: String,
        enum: ['female', 'male', 'transgender']
    },
    caste: String,
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
    }
});

module.exports = Mongoose.model('Scholarship', ScholarshipSchema);