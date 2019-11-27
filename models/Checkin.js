var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Checkin = new Schema({
  action: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true,
    default: Date.now
  },
  message: {
    type: String
  },
  userid: {
    type: String,
    required: true
  }
});

module.exports = Checkin = mongoose.model("checkins", Checkin);
