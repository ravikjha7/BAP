const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mobile: String,
    created_at: {
        type: Date,
        default: new Date()
    },
    resume: String,
    profile_pic: String,
    category: String,
    college_name: String,
    course: String,
    yearOfStudy: String,
    branch: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    applied_scholarships: [Object],
    accepted_scholarships: [Object],
    rejected_scholarships: [Object],
    all_scholarships: [Object]
});

module.exports = Mongoose.model('User', UserSchema);