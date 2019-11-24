const JwtStrategy = require("passport-jwt").Strategy;
const CustomStrategy = require("passport-custom").Strategy;

const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const config = require("config");
const jwtDecode = require("jwt-decode");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get("jwt_secret");

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );

  passport.use(
    "admin-jwt",
    new CustomStrategy((req, done) => {
      //get admin id from token
      const userData = jwtDecode(req.headers.authorization);

      User.findById(userData.id)
        .then(user => {
          //only if the user is an admin
          if (user && user.isAdmin) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
