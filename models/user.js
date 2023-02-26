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
    gender: String,
    college_name: String,
    course: String,
    yearOfStudy: String,
    branch: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    noOfScholarships: {
        type: Number,
        default: 0
    },
    noOfCourses: {
        type: Number,
        default: 0
    },
    noOfMentors: {
        type: Number,
        default: 0
    },
    noOfJobs: {
        type: Number,
        default: 0
    }
});

module.exports = Mongoose.model('User', UserSchema);