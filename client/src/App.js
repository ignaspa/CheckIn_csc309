import React from "react";
import "./css/App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import DeleteUser from "./components/DeleteUser";
import AddFriend from "./components/AddFriend";
import SignUp from "./components/SignUp";
import Navbar from "./components/Layout/Navbar";
import AdminDashboard from "./components/AdminComponents/AdminDashboard";
import Login from "./components/Login";
import Profile from "./components/ProfileComponents/Profile";
import ProfileLinks from "./components/ProfileComponents/Profile-links";
import UserDashboard from "./components/DashboardComponents/UserDashboard";
import FriendRequestsSection from "./components/FriendRequestsComponents/FriendRequests";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { login, logoutUser } from "./redux/actions";
import store from "./redux/store";
import UserPrivateRoute from "./components/PrivateRoutes/UserPrivateRoute";
import AdminPrivateRoute from "./components/PrivateRoutes/AdminPrivateRoute";

//Check for Token and change store state to make it persists over page refreshes as well
if (localStorage.jwtToken) {
  //Set Auth Token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);

  //Set user and isAuthenticated
  store.dispatch(login(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());
  }
}

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <AdminPrivateRoute
            exact
            path="/admin-dashboard"
            component={AdminDashboard}
          />
          <Route exact path="/login" component={Login} />
          <UserPrivateRoute
            exact
            path="/profile/:username"
            component={Profile}
          />
          } />
          <UserPrivateRoute
            exact
            path="/profile-links"
            component={ProfileLinks}
          />
          <UserPrivateRoute
            exact
            path="/user-dashboard"
            component={UserDashboard}
          />
          <UserPrivateRoute
            exact
            path="/friend-requests"
            component={FriendRequestsSection}
          />
          <UserPrivateRoute exact path="/deleteuser" component={DeleteUser} />
          <UserPrivateRoute exact path="/addfriend" component={AddFriend} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
