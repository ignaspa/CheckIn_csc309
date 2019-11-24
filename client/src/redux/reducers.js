import { combineReducers } from 'redux';

export const loginReducer = (state = null, action) => {
    switch (action.type) {
    case "LOGIN":
        return action.payload;
    default:
        return state;
    };
};

export const allReducers = combineReducers({
    userId: loginReducer,
});

export default allReducers;
