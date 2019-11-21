import { combineReducers } from 'redux';

export const loginReducer = (state = {}, action) => {
    
    console.log("Received this:");
    console.log(action.type);
  
    switch (action.type) {
    case "LOGIN":
        return action.payload;
    default:
        return null;
    };
};

export const allReducers = combineReducers({
    user: loginReducer,
});

export default allReducers;
