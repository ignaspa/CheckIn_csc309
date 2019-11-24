const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const signToken = require("../../utils/jwtSign");
const passport = require("passport");

// to validate object IDs
const { ObjectID } = require('mongodb')

//load input validation
const validateLoginInput = require("../../validation/login");
const validateRegisterInput = require("../../validation/register");

//Load user model
const User = require("../../models/User");

//  @route GET api/users/
//  @desc Tests users router
//  @access Public
router.get("/", (req, res) => res.json({ success: "Users Works" }));

//  @route GET api/users/login
//  @desc Login User and return a JWT on success
//  @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find the user by email
  User.findOne({ email: email })
    .then(user => {
      //check for user
      if (!user) {
        errors.email = "Invalid Email or Password";
        return res.status(404).json(errors);
      }

      //Check password by comparing it with encrypted password in the db
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //password Matched then send jwt token
          const token = signToken(user);
          res.status(200).json({ token: "Bearer " + token });
        } else {
          errors.password = "Invalid Email or Password";
          return res.status(400).json(errors);
        }
      });
    })
    .catch(err => {
      console.log(err);
      //return internal server error
      return res.status(500).json(err);
    });
});

//  @route GET api/users/register
//  @desc Register User
//  @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        isAdmin: false,
        activeCheckin: null,
        friends: [],
        friendRequests: [],
        pastCheckins: [],
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              return res.json(user);
            })
            .catch(err => {
              console.log(err);
              return res.status(500).json(err);
            });
        });
      });
    }
  });
});

//  @route GET api/users/all
//  @desc Get all Users. Responds with a list of all users on success
//  @access Public
router.get("/all", (req, res) => {
  let errors = {};

  User.find()
    .select("friends friendRequests pastCheckins _id name email activeCheckin")
    .then(users => {
      if (!users) {
        errors.noUsers = "There are no users";
        return res.status(404).json(errors);
      }

      return res.json(users);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json(err);
    });
});

//  @route DELETE api/users/:id
//  @desc Delete user
//  @access Private. Endpoint protected by passport middleware and can only be accessed by the ADMIN User.          ADMIN User cannot delete itself.
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("testing delete user");
    return res.json("Hey");
  }
);
//  @route PATCH api/users/friends
//  @desc Adds or deletes friends for a given user. Need to pass on "action" as "add"/"delete"
//  @access Public
router.patch("/friends/:id", async (req, res) => {

    const id = req.params.id

	  // Validate id
	  if (!ObjectID.isValid(id) || !ObjectID.isValid(req.body.friendID)) {
		  res.status(404).send()
    }
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
router.patch("/requests/:id", async (req, res) => {
  const id = req.params.id

	  // Validate id
	  if (!ObjectID.isValid(id) || !ObjectID.isValid(req.body.requestFriendID)) {
		  res.status(404).send()
    }
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

//  @route PATCH api/users/details
//  @desc Updates name and bio for User. Responds updated User object.
//  @access Public
router.patch("/details", (req, res) => {

  User.updateOne(
    {email: req.body.email},
    {
      $set: { bio: req.body.newbio, name: req.body.newname}
    });
  User.findOne({email: req.body.email})
    .then(item => {
      return res.json(item);
    })
    .catch((err) => {
      console.log(err);
    })

});

module.exports = router;
