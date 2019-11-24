const express = require("express");
const router = express.Router();
const passport = require("passport");

// load checkin model
const Checkin = require("../../models/Checkin");
// load user model
const User = require("../../models/User");

// Get all checkins
router.get(
  "/",
  passport.authenticate("admin-jwt", { session: false }),
  async (req, res) => {
    try {
      const checkins = await Checkin.find();
      res.json(checkins);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Get Checkins for given user id
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const checkins = await Checkin.find({ userid: req.params.id });
      res.json(checkins);
    } catch (error) {
      return res.status(500).json({ message: err.message });
    }
  }
);

// Create one checkin
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const checkin = new Checkin({
      action: req.body.action,
      location: req.body.location,
      time: req.body.time,
      message: req.body.message,
      userid: req.body.userid
    });

    try {
      const newCheckin = await checkin.save();
      User.findOneAndUpdate(
        { _id: req.body.userid },
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
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let removed = await Checkin.findOneAndDelete({ _id: req.params.id }).catch(
      err => {
        res.status(400).json({ message: err.message });
      }
    );
    let isActive = false;

    await User.findOneAndUpdate(
      { _id: removed.userid },
      { $pull: { pastCheckins: removed.id } }
    ).catch(err => {
      res.status(400).json({ message: err.message });
    });

    res.json({ message: "Deleted checkin", checkin: removed });
  }
);

module.exports = router;
