var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Checkin = new Schema({
    id: {
        type: Number,
        required: true
    },
    action: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    message: {
        type: String
    },
    userid: {
        type: String,
        required: true
    },
});

module.exports = Checkin = mongoose.model("checkins", Checkin);