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
    isVerified: {
        type: Boolean,
        default: false
    }
});

module.exports = Mongoose.model('User', UserSchema);