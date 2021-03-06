import { combineReducers } from "redux";
import isEmpty from "../validation/isEmpty";

const loginInitialState = {
  isAuthenticated: false,
  user: {}
};

const errorInitialState = {};

const userDataInitialState = {};

const friendsDataInitialState = {};

const friendsCheckinsInitialState = {};

const newCheckinInitialState = {};

const activeCheckinInitialState = {};

const specificUserInitialState = {};

const userCheckinsInitialState = {};

export const loginReducer = (state = loginInitialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};

export const newUserReducer = (state = false, action) => {
    switch (action.type) {
    case "NEW_USER":
        return true;
    }
};

export const errorReducer = (state = errorInitialState, action) => {
  switch (action.type) {
    case "GET_ERRORS":
      return action.payload;
    case "CLEAR_ERRORS":
      return {};
    default:
      return state;
  }
};

export const userDataReducer = (state = userDataInitialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload
      };
    default:
      return state;
  }
};

export const usersListReducer = (state = userDataInitialState, action) => {
  switch (action.type) {
    case "SET_LIST_USERS":
      return {
        ...state,
        listUsers: action.payload
      };
    default:
      return state;
  }
}
export const friendsDataReducer = (state = friendsDataInitialState, action) => {
  switch (action.type) {
    case "SET_FRIENDS_DATA":
      return {
        ...state,
        friendsData: action.payload
      };
    default:
      return state;
  }
}

export const friendsCheckinsReducer = (state = friendsCheckinsInitialState, action) => {
  switch (action.type) {
    case "SET_FRIENDS_CHECKINS":
      return {
        ...state,
        friendsCheckins: action.payload
      }
    default:
      return state
  }
}

export const newCheckinReducer = (state = newCheckinInitialState, action) => {
  switch(action.type) {
    case "SET_NEW_CHECKIN":
      return {
        ...state, 
        newCheckin: action.payload
      }
    default:
      return state  
  }
}

export const activeCheckinReducer = (state = activeCheckinInitialState, action) => {
  switch(action.type) {
    case "SET_ACTIVE_CHECKIN":
      return {
        ...state, 
        activeCheckin: action.payload
      }
    default:
      return state  
  }
}

export const specificUserReducer = (state = specificUserInitialState, action) => {
  switch(action.type) {
    case "SET_SPECIFIC_USER":
      return {
        ...state, 
        specificUser: action.payload
      }
    default:
      return state
  }
}

export const userCheckinsReducer = (state = userCheckinsInitialState, action) => {
  switch(action.type) {
    case "SET_USER_CHECKINS":
      return {
        ...state, 
        userCheckins: action.payload
      }
    default:
      return state
  }
}

export const allReducers = combineReducers({
  user: loginReducer,
  errors: errorReducer,
  userData: userDataReducer,
  listUsers: usersListReducer,
  friendsCheckins: friendsCheckinsReducer,
  friendsData: friendsDataReducer, 
  newCheckin: newCheckinReducer, 
  activeCheckin: activeCheckinReducer, 
  specificUser: specificUserReducer, 
  userCheckins: userCheckinsReducer
});

export default allReducers;
