import React from "react";
import "../css/App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../components/Home";
import SignUp from "../components/SignUp";
import Navbar from "./Layout/Navbar";

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
                  </Link>
                </li>
                <li>
                  <Link to={"/signup"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </nav>
            <hr />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
