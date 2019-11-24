const passport = require("passport");
const express = require('express')
const router = express.Router()

// load user model 
const User = require("../../models/User")


//  @route PATCH api/users/requests
//  @desc Adds friend requests for a given user
//  @access Private 
// {
//     friendID: <person requesting to be ur friend ID>
// }
router.patch("/add", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const id = req.user.id

      // add friend to your list of requests
      let user = await User.findOneAndUpdate({_id: id},
        { $push: { "friendRequests": req.body.friendID }}, 
        { new: true })
      .catch((err) => {
        res.status(400).json({message: err.message})
      })

      res.json(user)

})

//  @route PATCH api/users/requests
//  @desc Deletes friend requests for a given user
//  @access Private
// {
//     friendID: <person requesting to be ur friend ID>
// } 
router.patch("/delete", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const id = req.user.id

        // delete friend from your friend requests
        User.findOneAndUpdate({_id: id}, 
          { $pull: {"friendRequests": req.body.friendID}}, 
          {new: true})
          .catch((err) => {
              res.status(400).json({message: err.message})
          })
          .then((user) => {
            return res.json(user);
          })
  })

module.exports = router
