import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const loginUser = id => {
  console.log("TRIGGERED ACTION LOGIN");
  return {
    type: "LOGIN",
    payload: id
  };
};

export const logoff = () => {
  return {
    type: "LOGOFF"
  };
};
