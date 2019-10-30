import React from "react";
import "./css/App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Navbar from "./components/Layout/Navbar";
import AdminDashboard from "./components/AdminComponents/AdminDashboard";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/admin-dashboard" component={AdminDashboard} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
