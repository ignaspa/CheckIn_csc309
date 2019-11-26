const express = require("express");
const router = express.Router();
const passport = require("passport");

// load checkin model
const Checkin = require("../../models/Checkin");
// load user model
const User = require("../../models/User");

// Get all checkins (for admin)
router.get(
  "/all",
  passport.authenticate("admin-jwt", { session: false }),
  async (req, res) => {
    try {
      const checkins = await Checkin.find().sort({ date: -1 });
      res.json(checkins);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Route to get active checkin for this user
router.get(
  "/active",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).catch(err => {
        res.status(400).json(err);
      });
      res.json(user.activeCheckin);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Route to get our friend's checkins
router.get(
  "/friends",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).catch(err => {
        res.status(400).json(err);
      });

      let userList = user.friends;
      userList.push(req.user.id);

      let query = Checkin.where("userid")
        .in(userList)
        .sort({ time: -1 });

      let promise = query.exec();

      promise
        .then(response => {
          res.json(response);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Get Checkins for given user id
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const checkins = await Checkin.find({ userid: req.user.id });
      res.json(checkins);
    } catch (error) {
      return res.status(500).json({ message: err.message });
    }
  }
);

// Create one checkin
// {
//   action: <action>,
//   location: <location>,
//   message: <message>
// }
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const checkin = new Checkin({
      action: req.body.action,
      location: req.body.location,
      message: req.body.message,
      userid: req.user.id
    });

    try {
      const newCheckin = await checkin.save();
      User.findByIdAndUpdate(
        req.user,
        { $inc: { totalCheckins: 1 } },
        { activeCheckin: newCheckin.id }
      ).catch(err => {
        res.status(400).json({ message: err.message });
      });

      res.status(201).json(newCheckin);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

// Delete one checkin
// expects
// {
//   checkinID: <checkinIDToDelete>
// }
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let removed = await Checkin.findOneAndDelete({
      id: req.body.checkinId
    }).catch(err => {
      res.status(400).json({ message: err.message });
    });

    let user = await User.find({ id: removed.userId }).catch(error => {
      res.status(400).json({ message: error });
    });

    // if update being deleted is the active one
    if (user.activeCheckin == req.body.checkinId) {
      User.findAndUpdate(
        { id: removed.userId },
        { $inc: { totalCheckins: -1 } },
        { activeCheckin: null }
      ).catch(err => {
        res.status(400).json({ message: err.message });
      });
    }
    res.json({ message: "Deleted checkin", checkin: removed });
  }
);

module.exports = router;
