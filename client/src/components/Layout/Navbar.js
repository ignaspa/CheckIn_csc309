import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from '../../redux/actions.js';
import { bindActionCreators } from "redux";

class Navbar extends Component {
    logOut = (event) => {
        this.props.logoutUser();
    }
  render() {
      const logOutButton = this.props.user.isAuthenticated ? (<ul className="navbar-nav mr-auto list-group-horizontal">
          <li>
              <Link to={"/"} className="nav-link text-white navitem" onClick={this.logOut}>
                  Logout
              </Link>
          </li>            
      </ul>) : "";
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
          {logOutButton}
        
        </nav>
      </div>
    );
  }
}

const mapStateToProps = store => ({
    user: store.user,
    errors: store.errors,
    userData: store.userData
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ logoutUser: logoutUser }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
