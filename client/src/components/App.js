import React from "react";
import "../css/App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../components/Home";
import SignUp from "../components/SignUp";
import Delete from "./components/Delete";
import Navbar from "./Layout/Navbar";
import LoginComponent from "../components/Login.js";
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
                  <Link to={"/delete"} className="nav-link">
                    Delete{" "}
                  </Link>{" "}
                </li>{" "}
              </ul>{" "}
            </nav>{" "}
            <hr />
            <Switch>
              <Route exact path="/" component={Home} />{" "}
              <Route path="/signup" component={SignUp} />{" "}
              <Route path="/login" component={LoginComponent} />{" "}
              <Route path="/user-dashboard" component={UserDashboard}/> {" "}
              <Route path="/friend-requests" component={FriendRequestsSection} /> {" "}
              <Route path="/delete" component={Delete} />{" "}
            </Switch>{" "}
          </div>{" "}
        </Router>{" "}
      </div>
    );
  }
}

export default App;
