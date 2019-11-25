import { combineReducers } from "redux";

export const loginReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    default:
      return 9;
  }
};

export const allReducers = combineReducers({
  userId: loginReducer
});

export default allReducers;
