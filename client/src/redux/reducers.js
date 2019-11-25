import { combineReducers } from "redux";
import isEmpty from "../validation/isEmpty";

const loginInitialState = {
  isAuthenticated: false,
  user: {}
};

const errorInitialState = {};

const userDataInitialState = {};

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

export const allReducers = combineReducers({
  user: loginReducer,
  errors: errorReducer,
  userData: userDataReducer
});

export default allReducers;
