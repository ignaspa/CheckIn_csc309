import React from "react";
import "./css/App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Delete from "./components/Delete";
import SignUp from "./components/SignUp";
import Navbar from "./components/Layout/Navbar";
import AdminDashboard from "./components/AdminComponents/AdminDashboard";
import Login from "./components/Login"
import UserDashboard from "./components/DashboardComponents/UserDashboard"
import FriendRequestsSection from "./components/FriendRequestsComponents/FriendRequests"

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
          <Route exact path="/user-dashboard" component={UserDashboard} />
          <Route exact path="/friend-requests" component={FriendRequestsSection} />
          <Route exact path="/delete" component={Delete} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
