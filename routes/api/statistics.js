const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load user model
const User = require("../../models/User");
// load checkin model
const Checkin = require("../../models/Checkin");

//  @route GET api/statistics/
//  @desc Get Current App Statistics
//  @access Private. Only accessible by Admin User.
router.get(
  "/",
  passport.authenticate("admin-jwt", { session: false }),
  (req, res) => {
    //initialize object
    let stats = {
      totalUsers: 0,
      totalCheckins: 0
    };
    //get all non Admin Users
    User.countDocuments({ isAdmin: false }, (err, userCount) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      stats.totalUsers = userCount;

      //get all checkins
      Checkin.countDocuments({}, (err, checkinCount) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }
        stats.totalCheckins = checkinCount;

        return res.json(stats);
      });
    });
  }
);

module.exports = router;
