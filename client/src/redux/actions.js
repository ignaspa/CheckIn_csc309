import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const authenticateUser = userData => dispatch => {
  dispatch(clearErrors());

  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Save to local storage
      const { token } = res.data;

      //Set token  to local storage
      localStorage.setItem("jwtToken", token);
      //Set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);

      //set current user
      dispatch(login(decoded));
    })
    .catch(err => {
      console.log(err);
      return dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

//Clear errors
export const clearErrors = () => {
  return {
    type: "CLEAR_ERRORS"
  };
};

export const login = decoded => {
  return {
    type: "LOGIN",
    payload: decoded
  };
};

export const logoff = () => {
  return {
    type: "LOGOFF"
  };
};
