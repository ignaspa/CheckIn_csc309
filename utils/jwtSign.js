const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function createToken(user) {
  return jwt.sign({ id: user.id, name: user.name }, config.get("jwt_secret"), {
    expiresIn: 3600
  });
};
