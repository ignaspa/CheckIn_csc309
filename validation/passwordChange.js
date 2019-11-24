//Validate password change while the user is logged in

const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePasswordChangeInput(data) {
  let errors = {};

  //if no input make them empty strings because the Validator library only takes in strings as input

  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be atleast 6 characters";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
