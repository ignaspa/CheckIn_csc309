const passport = require("passport");
const express = require('express')
const router = express.Router()

// load user model 
const User = require("../../models/User")

//  @route PATCH api/users/friends
//  @desc Adds friends for a given user. 
//  @access Private
// Expects:
// {
//     friendID: <your friends id>
// }
router.patch("/add", passport.authenticate("jwt", { session: false }), async (req, res) => {

    const id = req.user.id
      // add yourself to your friend's list 
      let friend = await User.findOneAndUpdate({_id: req.body.friendID},
        { $push: { "friends": id }})
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
  })

//  @route PATCH api/users/friends
//  @desc Deletes friends for a given user. 
//  @access Private
// Expects:
// {
//     friendID: <your friends id>
// }
router.patch("/delete", passport.authenticate("jwt", { session: false }), async (req, res) => {

    const id = req.user.id

      // delete yourself from friend's list
      User.findOneAndUpdate({_id: req.body.friendID},
        { $pull: { "friends": id }})
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
  })


module.exports = router
