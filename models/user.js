const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    middle_name: String,
    last_name: String,
    full_name: String,
    mobile: Number,
    created_at: {
        type: Date,
        default: new Date()
    },
    last_modified_at: {
        type: Date,
        default: new Date()
    },
});

module.exports = Mongoose.model('User', UserSchema);