const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const signToken = require("../../utils/jwtSign");

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

// middleware function to get specific user 
async function getUser(req, res, next) {
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'Cant find user'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}

//  @route PATCH api/users/friends
//  @desc Adds or deletes friends for a given user. Need to pass on "action" as "add"/"delete"
//  @access Public
router.patch("/friends/:id", getUser, async (req, res) => {
  if (req.body.friendID != null) {
    if (req.body.action == "add" & !res.user.friends.includes(req.body.friendID)) {
      // add to your list 
      res.user.friends.push(req.body.friendID)  

      // add yourself to your friend's list 
      User.findById(req.body.friendID)
          .then(item => {
            let friends = item.friends
            friends.push(req.params.id)
            item.friends = friends
            item.save()
          })
          .catch((err) => {
            res.status(400).json({ message: err.message})
          })
    }
    else if (req.body.action == "delete") {
      // find index for user in friends and delete friend from friend's list
      let userIndex = res.user.friends.findIndex(userID => {
        return userID == req.body.friendID
      })
      if (typeof(userIndex) != undefined) {
        res.user.friends.splice(userIndex, 1)
      }    

      // delete yourself from friend's list 
      User.findById(req.body.friendID)
          .then(item => {
            let friendIndex = item.friends.findIndex(userID => {
              return userID == req.params.id
            })
            if (typeof(friendIndex) != undefined) {
              item.friends.splice(friendIndex, 1)
            } 
            item.save()
          })
          .catch((err) => {
            res.status(400).json({ message: err.message})
          })

    }
  }
  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
})

//  @route PATCH api/users/requests
//  @desc Adds or deletes friend requests for a given user. Need to pass on "action" as "add"/"delete"
//  @access Public
router.patch("/requests/:id", getUser, async (req, res) => {
  if (req.body.requestFriendID != null) {
    if (req.body.action == "add" & !res.user.friendRequests.includes(req.body.requestFriendID)) {
      res.user.friendRequests.push(req.body.requestFriendID)  
    }
    else if (req.body.action == "delete") {
      // find index for user in friends
      let userIndex = res.user.friendRequests.findIndex(userID => {
        return userID == req.body.requestFriendID
      })
      if (typeof(userIndex) != undefined) {
        res.user.friendRequests.splice(userIndex, 1)
      }    
    }
  }
  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
})

//  @route PATCH api/users/details
//  @desc Updates name and bio for User. Responds updated User object.
//  @access Public
router.patch("/details", (req, res) => {

  User.updateOne(
    {email: req.body.email},
    {
      // bio: req.body.newbio,
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
