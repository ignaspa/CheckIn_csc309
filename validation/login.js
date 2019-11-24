const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  //if no input make them empty strings because the Validator library only takes in strings as input
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "username field is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
