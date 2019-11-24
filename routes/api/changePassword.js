const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

//Load user model
const User = require("../../models/User");

//load validation
const validatePasswordChangeInput = require("../../validation/passwordChange");

//  @route post api/changePassword/:id
//  @desc Change User's Account password from admin dashboard using user id
//  @access Private. Only Admin can change the password.
router.post(
  "/:id",
  passport.authenticate("admin-jwt", { session: false }),
  (req, res) => {
    //look for matching user
    User.findOne({
      _id: req.params.id
    }).then(user => {
      if (!user) {
        return res.status(400).json({ response: "No User found" });
      } else {
        const data = {
          password: req.body.password
        };

        const { errors, isValid } = validatePasswordChangeInput(data);
        //Check validation
        if (!isValid) {
          return res.status(400).json(errors);
        }

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(data.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            user.password = hash;
            user
              .save()
              .then(user => {
                return res
                  .status(200)
                  .json({ response: "Password Changed Succesfully" });
              })
              .catch(err => {
                console.log(err);
                return res.status(500).json(err);
              });
          });
        });
      }
    });
  }
);

module.exports = router;
