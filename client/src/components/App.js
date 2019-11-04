import React from "react";
import "../css/App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../components/Home";
import SignUp from "../components/SignUp";
import DeleteUser from "./components/DeleteUser";
import AddFriend from "./components/AddFriend";
import Navbar from "./Layout/Navbar";
import LoginComponent from "../components/Login.js";
import Profile from "../components/Profile.js"
import UserDashboard from "../components/DashboardComponents/UserDashboard"
import FriendRequestsSection from "./FriendRequestsComponents/FriendRequests"

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Router>
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li>
                  <Link to={"/"} className="nav-link">
                    {" "}
                    Home{" "}
                  </Link>{" "}
                </li>{" "}
                <li>
                  <Link to={"/signup"} className="nav-link">
                    Sign Up{" "}
                  </Link>{" "}
                </li>{" "}
                <li>
                  <Link to={"/login"} className="nav-link">
                    Login{" "}
                  </Link>{" "}
                </li>{" "}
                <li>
                  <Link to={"/deleteuser"} className="nav-link">
                    Delete User{" "}
                  </Link>{" "}
                </li>{" "}
                <li>
                  <Link to={"/profile"} className="nav-link">
                    Profile{" "}
                  </Link>{" "}
                </li>{" "}
              </ul>{" "}
            </nav>{" "}
            <hr />
            <Switch>
              <Route exact path="/" component={Home} />{" "}
              <Route path="/signup" component={SignUp} />{" "}
              <Route path="/login" component={LoginComponent} />{" "}
              <Route path="/profile" component={Profile} />{" "}
              <Route path="/user-dashboard" component={UserDashboard} /> {" "}
              <Route path="/friend-requests" component={FriendRequestsSection} /> {" "}
              <Route path="/deleteuser" component={DeleteUser} />{" "}
              <Route path="/addfriend" component={AddFriend} />{" "}
            </Switch>{" "}
          </div>{" "}
        </Router>{" "}
      </div>
    );
  }
}

export default App;
