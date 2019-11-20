var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    active_checkin: {
        type: Number
    },
    friends: [
        {
            type: Number
        }
    ],
    friend_requests: [
        {
            type: Number
        }
    ],
    past_checkins: [
        {
            type: Number
        }
    ],
    password: {
        type: String,
        required: true
    },
});

module.exports = User = mongoose.model("users", User);