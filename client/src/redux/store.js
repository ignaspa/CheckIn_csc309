import thunk from "redux-thunk";
import allReducers from "./reducers.js";
import { createStore, applyMiddleware, compose } from "redux";

const middleware = [thunk];
const store = createStore(
  allReducers,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
