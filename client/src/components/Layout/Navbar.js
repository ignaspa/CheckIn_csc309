import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/App.css";
import { connect } from "react-redux";
import { logoutUser, getUserData } from '../../redux/actions.js';
import { bindActionCreators } from "redux";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navpic: ""
    }
  }
  componentDidMount() {
    this.props.getUserData();
}
componentWillReceiveProps(nextProps) {
  let pp = nextProps.userData.userData.profilepic;
  this.setState({navpic: pp})
}
  logOut = (event) => {
    this.props.logoutUser();
  }
  render() {

    const logOutButton = this.props.user.isAuthenticated ? (<ul className="navbar-nav ml-auto list-group-horizontal">
      <li>
        <Link to={"/"} className="nav-link text-white navitem logoutbutton" onClick={this.logOut}>
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
          <ul className="navbar-nav ml-auto list-group-horizontal">
            <li>
              <img className="rounded-circle" width="55" height="55" src={this.state.navpic} alt="" />
            </li>
            {logOutButton}
          </ul>

        </nav>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.user,
  userData: store.userData,
  errors: store.errors,
  userData: store.userData
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ logoutUser: logoutUser, getUserData, getUserData }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
