import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <ul className="navbar-nav mr-auto">
            <li>
              <Link to={"/"} className="nav-link text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/signup"} className="nav-link text-white">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to={"/login"} className="nav-link text-white">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

