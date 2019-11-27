const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load user model
const User = require("../../models/User");
// load checkin model
const Checkin = require("../../models/Checkin");

//  @route GET api/statistics/total
//  @desc Get total User and total Checkin Statistics
//  @access Private. Only accessible by Admin User.
router.get(
  "/total",
  passport.authenticate("admin-jwt", { session: false }),
  (req, res) => {
    //initialize object
    let stats = {
      totalUsers: 0,
      totalCheckins: 0
    };
    //get count of all non Admin Users
    User.countDocuments({ isAdmin: false }, (err, userCount) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      stats.totalUsers = userCount;

      //get count of all checkins
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

//  @route GET api/statistics/total
//  @desc Get today's new registered User and new Checkin Statistics
//  @access Private. Only accessible by Admin User.
router.get(
  "/today",
  passport.authenticate("admin-jwt", { session: false }),
  (req, res) => {
    //initialize object

    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    let stats = {
      newUsersToday: 0,
      newCheckinsToday: 0
    };
    //get all count of all non Admin Users who signed up today
    User.countDocuments(
      { isAdmin: false, date: { $gte: startOfToday } },
      (err, userCount) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }
        stats.newUsersToday = userCount;

        //get count of all checkins today
        Checkin.countDocuments(
          { date: { $gte: startOfToday } },
          (err, checkinCount) => {
            if (err) {
              console.log(err);
              return res.status(500).json(err);
            }
            stats.newCheckinsToday = checkinCount;

            return res.json(stats);
          }
        );
      }
    );
  }
);

module.exports = router;
