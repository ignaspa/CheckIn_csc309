var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
  name: {
    type: String,
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
  activeCheckin: {
    type: Number
  },
  friends: [
    {
      type: String
    }
  ],
  friendRequests: [
    {
      type: String
    }
  ],
  pastCheckins: [
    {
      type: String 
    }
  ],
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", User);
