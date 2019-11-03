import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <ul className="navbar-nav mr-auto list-group-horizontal">
            <li>
              <Link to={"/"} className="nav-link text-white navitem">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/signup"} className="nav-link text-white navitem">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to={"/login"} className="nav-link text-white navitem">
                Login
              </Link>
            </li>
            <li>
              <Link to={"/delete"} className="nav-link text-white navitem">
                Delete
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

