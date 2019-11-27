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
//  @desc Get user object from ID
//  @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
      console.log(req.user.id);
    let user = await User.findById(req.user.id)
      .select(
        "friends friendRequests pastCheckins _id name username activeCheckin bio"
      )
      .catch(error => {
        res.status(400).json(error);
      });

    res.json(user);
  }
);

//  @route GET api/users/all
//  @desc Get all Users. Responds with a list of all users on success
//  @access Public
router.get("/all", (req, res) => {
  let errors = {};

  User.find({ isAdmin: false })
    .select(
      "friends friendRequests pastCheckins _id name username activeCheckin totalCheckins date"
    )
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

//  @route GET api/users/
//  @desc Gets specific user object from user id
//  @access Private
// {
//   userID: userID
// }
router.get(
  "/:userID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let user = await User.find({ _id: req.params.userID })
      .select(
        "friends friendRequests pastCheckins _id name username activeCheckin bio totalCheckins date"
      )
      .catch(error => {
        res.status(400).json(error);
      });

    res.json(user);
  }
);

//  @route GET api/users/login
//  @desc Login User and return a JWT on success
//  @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  //Find the user by username
  User.findOne({ username: username })
    .then(user => {
      //check for user
      if (!user) {
        errors.username = "Invalid Username or Password";
        return res.status(404).json(errors);
      }

      //Check password by comparing it with encrypted password in the db
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //password Matched then send jwt token
          const token = signToken(user);
          res.status(200).json({ token: "Bearer " + token });
        } else {
          errors.password = "Invalid Username or Password";
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

  console.log(req.body);
  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.username = "Username already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        isAdmin: false,
        activeCheckin: null,
        bio: "",
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
    .select(
      "friends friendRequests pastCheckins _id name username activeCheckin isAdmin"
    )
    .then(users => {
      if (!users) {
        console.log("hello")
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
  passport.authenticate("admin-jwt", { session: false }),
  (req, res) => {
    User.findByIdAndRemove({ _id: req.params.id })
      .then(() => res.json({ sucess: "true" }))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
);

//  @route PATCH api/users/details
//  @desc Updates name and bio for User. Responds updated User object.
//  @access Private
// expects:
// {newbio: "blah",
//  newname: "blah"
// }
router.patch(
  "/details",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findByIdAndUpdate(
      req.user.id,
      { $set: { bio: req.body.newbio, name: req.body.newname } },
      { new: true }
    )
      .catch(error => {
        return res.status(400).json({ message: error });
      })
      .then(user => {
        return res.json(user);
      });
  }
);

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
