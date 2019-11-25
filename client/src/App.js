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

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/admin-dashboard" component={AdminDashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile/:username" component={Profile} />} />
          <Route exact path="/profile-links" component={ProfileLinks} />
          <Route exact path="/user-dashboard" component={UserDashboard} />
          <Route
            exact
            path="/friend-requests"
            component={FriendRequestsSection}
          />
          <Route exact path="/deleteuser" component={DeleteUser} />
          <Route exact path="/addfriend" component={AddFriend} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
