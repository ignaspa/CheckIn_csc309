import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class Navbar extends Component {
    logOut = (event) => {
    }
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
          </ul>
        <ul className="navbar-nav mr-auto list-group-horizontal">
            <li>
                <Link to={"/"} className="nav-link text-white navitem" onClick={this.logOut}>
                    Logout
                </Link>
            </li>            
        </ul>
        </nav>
      </div>
    );
  }
}

