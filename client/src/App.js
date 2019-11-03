import React from "react";
import "./css/App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Navbar from "./components/Layout/Navbar";
import AdminDashboard from "./components/AdminComponents/AdminDashboard";
import Login from "./components/Login"
import Profile from "./components/Profile"
import ProfileLinks from "./components/Profile-links"
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
          <Route exact path="/profile" component={Profile}/>} />
          <Route exact path="/profile-links" component={ProfileLinks} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
