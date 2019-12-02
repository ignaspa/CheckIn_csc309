const passport = require("passport");
const express = require("express");
const router = express.Router();

// load user model
const User = require("../../models/User");

//  @route GET api/friends/
//  @desc Get all friends for this user. Responds with a list of all users on success
//  @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    const id = req.user.id;

    User.find({
      friends: id
    })
      .then(users => {
        if (!users) {
          errors.noFriends = "This user has no friends";
          return res.status(404).json(errors);
        }
        return res.json(users);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      });
  }
);

//  @route PATCH api/friends/add
//  @desc Adds friends for a given user.
//  @access Private
// Expects:
// {
//     friendID: <your friends id>
// }
router.patch(
  "/add",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log("patch");
    const id = req.user.id;
    // add yourself to your friend's list
    let friend = await User.findByIdAndUpdate(req.body.friendID, {
      $push: { friends: id }
    }).catch(err => {
      res.status(400).json({ message: err.message });
    });

    // add friend to your list
    let user = await User.findByIdAndUpdate(
      id,
      { $push: { friends: req.body.friendID } },
      { new: true }
    ).catch(err => {
      res.status(400).json({ message: err.message });
    });
    res.json(user);
  }
);

//  @route PATCH api/users/friends
//  @desc Deletes friends for a given user.
//  @access Private
// Expects:
// {
//     friendID: <your friends id>
// }
router.patch(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id = req.user.id;

    // delete yourself from friend's list
    User.findByIdAndUpdate(req.body.friendID, { $pull: { friends: id } }).catch(
      err => {
        res.status(400).json({ message: err.message });
      }
    );

    // delete friend from your friend's list
    User.findByIdAndUpdate(id, { $pull: { friends: req.body.friendID } })
      .catch(err => {
        res.status(400).json({ message: err.message });
      })
      .then(user => {
        return res.json(user);
      });
  }
);

module.exports = router;
