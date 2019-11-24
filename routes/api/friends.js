const passport = require("passport");
const express = require('express')
const router = express.Router()

// load user model 
const User = require("../../models/User")

//  @route PATCH api/users/friends
//  @desc Adds or deletes friends for a given user. Need to pass on "action" as "add"/"delete"
//  @access Public
router.patch("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {

    const id = req.params.id

    if (req.body.action == "add") {

      // add yourself to your friend's list 
      let friend = await User.findOneAndUpdate({_id: req.body.friendID},
        { $push: { "friends": req.params.id }})
      .catch((err) => {
        res.status(400).json({message: err.message})
      })

      // add friend to your list 
      let user = await User.findOneAndUpdate({_id: id},
        { $push: { "friends": req.body.friendID }}, 
        { new: true })
      .catch((err) => {
        res.status(400).json({message: err.message})
      })

      res.json(user)
    }
    else if (req.body.action == "delete") { 
      // delete yourself from friend's list
      User.findOneAndUpdate({_id: req.body.friendID},
        { $pull: { "friends": req.params.id }})
      .catch((err) => {
        res.status(400).json({message: err.message})
      })

      // delete friend from your friend's list
      User.findOneAndUpdate({_id: id}, 
        { $pull: {"friends": req.body.friendID}})
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
        .then((user) => {
          return res.json(user);
        })
      }
  })

//  @route PATCH api/users/requests
//  @desc Adds or deletes friend requests for a given user. Need to pass on "action" as "add"/"delete"
//  @access Public
router.patch("/requests/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const id = req.params.id

    if (req.body.action == "add") {
      // add friend to your list of requests
      let user = await User.findOneAndUpdate({_id: id},
        { $push: { "friendRequests": req.body.requestFriendID }}, 
        { new: true })
      .catch((err) => {
        res.status(400).json({message: err.message})
      })

      res.json(user)
    }
    else if (req.body.action == "delete") {
      // delete friend from your friend requests
      User.findOneAndUpdate({_id: id}, 
        { $pull: {"friendRequests": req.body.requestFriendID}}, 
        {new: true})
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
        .then((user) => {
          return res.json(user);
        })
      }
})

module.exports = router
