const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  //if no input make them empty strings because the Validator library only takes in strings as input
  data.name = !isEmpty(data.name) ? data.name : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
