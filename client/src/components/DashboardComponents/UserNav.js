import React, { Component } from "react";
import "../../css/UserDashboard.css";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { getUserData } from "../../redux/actions";
import { bindActionCreators } from "redux";

class UserNav extends Component {
  constructor(props) {
    super(props);
    this.props.getUserData();
    this.state = {
      redirect: "",
      user: this.props.userData
    };
  }
  componentDidMount() {
    this.props.getUserData();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.userData.userData });
  }

  friendRequests = event => {
    this.setState({ redirect: "/friend-requests" });
  };

  addFriends = event => {
    this.setState({ redirect: "/addfriend" });
  };

  editProfile = event => {
    this.setState({ redirect: "/profile" });
  };

  render() {
    const user = this.state.user;
    if (this.state.redirect === "/friend-requests") {
      return <Redirect to="/friend-requests" push={true} />;
    } else if (this.state.redirect === "/profile") {
      return (
        <Redirect
          to={{
            pathname: "/profile/" + user.username, 
            state: { profile_user_id: user._id }
          }}
          push={true}
        />
      );
    } else if (this.state.redirect === "/addfriend") {
      return <Redirect to="/addFriend" push={true} />;
    }

    return (
      <div className="shadow">
        <div className="card">
          <div className="card-body">
            <div>
              <img
                className="rounded-circle img-responsive"
                width="65"
                height="65"
                src={user.profilepic}
                alt=""
              />
            </div>
            <div className="h5">{user.name} </div>
            <div className="h7 text-muted">@{user.username}</div>
            <div className="h7">{user.bio}</div>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item align-items-center">
              <button className="btn btn-link" onClick={this.addFriends}>
                {" "}
                Add Friends{" "}
              </button>
            </li>
            <li className="list-group-item align-items-center">
              <button className="btn btn-link" onClick={this.friendRequests}>
                {" "}
                Friend Requests
              </button>
            </li>
            <li className="list-group-item align-items-center">
              <button className="btn btn-link" onClick={this.editProfile}>
                {" "}
                Edit Profile
              </button>
            </li>
          </ul>
        </div>
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
  return bindActionCreators({ getUserData: getUserData }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(UserNav);
