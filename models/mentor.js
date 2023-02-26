const Mongoose = require('mongoose');

const MentorSchema = new Mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    totalRatings: {
        type: Number,
        default: 0
    },
    about: String,
    qualification: String,
    experience: String,
    noOfMeetings: {
        type: Number,
        default: 0
    },
    expertise: String

});

module.exports = Mongoose.model('Mentor', MentorSchema);