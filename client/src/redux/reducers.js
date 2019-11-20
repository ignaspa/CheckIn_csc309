import { combineReducers } from 'redux';

export const loginReducer = (state = {}, action) => {
    switch (action.type) {
    case "LOGIN":
        return action.payload;
    default:
        return null;
    };
};

const allReducers = combineReducers({
    user: loginReducer,
});

export default allReducers;
