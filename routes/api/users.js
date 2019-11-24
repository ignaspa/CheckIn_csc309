const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const signToken = require("../../utils/jwtSign");
const passport = require("passport");

// to validate object IDs
const { ObjectID } = require("mongodb");

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
        bio: null,
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
    User.findByIdAndRemove({ _id: req.params.id }).then(() =>
      res.json({ sucess: "true" })
    );
  }
);

//  @route PATCH api/users/details
//  @desc Updates name and bio for User. Responds updated User object.
//  @access Private 
// expects: 
// {newbio: "blah", 
//  newname: "blah"
// }
router.patch("/details", passport.authenticate("jwt", { session: false }), (req, res) => {

  User.findByIdAndUpdate(req.user.id, 
    {$set : {bio: req.body.newbio, name: req.body.newname}}, 
    {new: true}
  ).catch((error) => {
    return res.status(400).json({message: error})
  }).then((user) => {
    return res.json(user)
  })
})
  

//  @route PATCH api/users/profilepic
//  @desc Updates profilepic for the user. Responds updated User object.
//  @access Public
router.patch("/profilepic", (req, res) => {
  console.log("newpic:");
  console.log(req.body.newpic);
  User.findOneAndUpdate(
    {email: req.body.email},
    {
      $set: {profilepic: req.body.newpic}
    }, 
    {new: true})
    .catch((error) => {
      res.status(500).json({message: error})
    })
    .then((user) => {
      res.json(user)
    });
    
  // User.findOne({email: req.body.email})
  //   .then(item => {
  //     return res.json(item);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })

});
module.exports = router;
