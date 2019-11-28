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
      console.log("here is an error in logging in");
      console.log(err);
      return dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const createUser = userData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/users/register", userData)
    .then(data => {
      console.log(data);
      const newUser = {
        username: userData.username,
        password: userData.password,
      }
    })
    .catch(err => {
      console.log(err);
      return dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
}

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

export const newUser = () => {
  return {
    type: "NEW_USER",
  };
};

//log user out
export const logoutUser = () => dispatch => {
  //remove token from local storage
  localStorage.removeItem("jwtToken");

  //Remove the auth header for future requests
  setAuthToken(false);
  // Set current user to empty object which will also set isAuthenticated to false
  dispatch(login({}));
  window.location.href = "/login";
};

/*Redux Action to get current user's data */
export const getUserData = () => dispatch => {
  axios
    .get("/api/users/")
    .then(res => {
      const userData = res.data;
      dispatch(setUserData(userData));
    })
    .catch(err => {
      return dispatch({
        type: "GET_ERRORS",
        payload: err
      });
    });
};

export const addFriend = (friend_id) => dispatch => {
  axios
    .patch("/api/requests/add", { friendID: friend_id })
    .then(res => {
      axios
        .get("/api/users/all")
        .then(response => {
          const userData = response.data;
          dispatch(setListUsers(userData));
        })
        .catch(err => {
          return dispatch({
            type: "GET_ERRORS",
            payload: err.response.data
          });
        });
    })
    .catch(err => {
      return dispatch({
        type: "GET_ERRORS",
        payload: err
      });
    });
};

export const getFriends = () => dispatch => {
  axios
    .get("/api/friends/")
    .then(res => {
      const friendsData = res.data;
      dispatch(setFriendsData(friendsData));
    })
    .catch(err => {
      return dispatch({
        type: "GET_ERRORS",
        payload: err
      });
    });
};

export const getAllUsers = () => dispatch => {
  axios
    .get("/api/users/all")
    .then(res => {
      const userData = res.data;
      dispatch(setListUsers(userData));
    })
    .catch(err => {
      return dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const setListUsers = usersData => {
  return {
    type: "SET_LIST_USERS",
    payload: usersData
  };
};


export const setFriendsData = (friendsData) => {
  return {
    type: "SET_FRIENDS_DATA",
    payload: friendsData
  }
}

export const setUserData = (userData) => {
  return {
    type: "SET_USER_DATA",
    payload: userData
  };
};

export const logoff = () => {
  return {
    type: "LOGOFF"
  };
};

/* Redux actions to get checkins */

// Get checkins to display in the dashboard
export const getFriendsCheckins = () => dispatch => {
  axios.get("/api/checkins/friends")
    .then(response => {
      const friendsCheckins = response.data
      dispatch(setFriendsCheckins(friendsCheckins))
    })
    .catch(err => {
      return dispatch({
        type: "GET_ERRORS",
        payload: err
      })
    })
}

// helper function to set friends checkins
export const setFriendsCheckins = friendsCheckins => {
  return {
    type: "SET_FRIENDS_CHECKINS",
    payload: friendsCheckins
  }
}

export const addNewCheckin = (action, message, location) => dispatch => {
  axios
    .post('/api/checkins/', {
      action: action,
      message: message,
      location: location
    })
    .then(response => {
      const newCheckin = response.data
      dispatch(setNewCheckin(newCheckin))
    })
    .catch(err => {
      return dispatch({
        type: "GET_ERRORS",
        payload: err
      })
    })
}

// helper function to set friends checkins
export const setNewCheckin = newCheckin => {
  return {
    type: "SET_NEW_CHECKIN",
    payload: newCheckin
  }
}

export const getActiveCheckin = () => dispatch => {
  axios.get("/api/checkins/active")
    .then(response => {
      const activeCheckin = response.data
      dispatch(setActiveCheckin(activeCheckin))
    })
    .catch(err => {
      return dispatch({
        type: "GET_ERRORS",
        payload: err
      })
    })
}

export const setActiveCheckin = activeCheckin => {
  return {
    type: "SET_ACTIVE_CHECKIN",
    payload: activeCheckin
  }
}

export const getSpecificUser = (userID) => dispatch => {
  console.log(userID);
  axios.get("/api/users/" + userID).then(response => {
    console.log(response.data);
    const specificUser = response.data[0];
    dispatch(setSpecificUser(specificUser));
  }).catch(error => {
    return dispatch({
      type: "GET_ERRORS",
      payload: error
    })
  })
}

export const setSpecificUser = specificUser => {
  return {
    type: "SET_SPECIFIC_USER",
    payload: specificUser
  }
}

export const getCheckinsForUser = (userID) => dispatch => {
  axios.get("/api/checkins/" + userID)
    .then(response => {
      const userCheckins = response.data
      dispatch(setUserCheckins(userCheckins))
    }).catch(error => {
      return dispatch({
        type: "GET_ERRORS",
        payload: error
      })
    })
}

export const updateProfilePic = (pic) => dispatch => {
  axios.patch("/api/users/profilepic")
    .then(response => {
      axios
        .get("/api/users/")
        .then(res => {
          const userData = res.data;
          dispatch(setUserData(userData));
        })
        .catch(err => {
          return dispatch({
            type: "GET_ERRORS",
            payload: err
          });
        });
    }).catch(error => {
      return dispatch({
        type: "GET_ERRORS",
        payload: error
      })
    })
}

export const setUserCheckins = userCheckins => {
  return {
    type: "SET_USER_CHECKINS",
    payload: userCheckins
  }
}

export const updateUserInfo = (newbio, newname) => dispatch => {
  axios.patch("/api/users/details", {
    newname: newname,
    newbio: newbio
  })
    .then(response => {
      const updatedUser = response.data
      dispatch(setUserData(updatedUser))
    }).catch(error => {
      return dispatch({
        type: "GET_ERRORS",
        payload: error
      })
    })
}

export const deleteFriend = (friendID) => dispatch => {
  axios.patch("/api/friends/delete", {
    friendID: friendID
  })
  .then(response => {
    const updatedUser = response.data 
    dispatch(setUserData(updatedUser))
  }).catch(error => {
    return dispatch( {
      type: "GET_ERRORS", 
      payload: error
    })
  })
}






