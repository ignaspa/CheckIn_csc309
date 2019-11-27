/* The user dashboard */
import React, { Component } from "react";
import "../../css/UserDashboard.css";
import CheckInForm from "./CheckinForm";
import CheckInUpdates from "./UserData"
import UserNav from "./UserNav";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserData, getFriendsCheckins, addNewCheckin } from "../../redux/actions";


class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCheckins: [],
      newCheckin: {}
    };
  }

  componentDidMount() {
    this.props.getUserData();
    this.props.getFriendsCheckins();
  }

  componentWillReceiveProps(nextProps) {
   let friendsCheckins = nextProps.friendsCheckins.friendsCheckins
    this.setState({ allCheckins: friendsCheckins}); 

    // console.log("NEW STATE")
    // console.log(this.state)
  }

  submitCheckIn = state => {
    console.log("Submitting check in");
    this.props.addNewCheckin(state.action, state.message, state.location)
    this.props.getFriendsCheckins()
  };

  render() {
    return (
      <div className="container-fluid gedf-wrapper">
        <div className="row">
          <div className="col-3">
            <UserNav />
          </div>

          <div className="col-9" id="checkingContents">
            <CheckInForm submitCheckIn={this.submitCheckIn} />
            <CheckInUpdates
              allCheckins={this.state.allCheckins}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = store => ({
  user: store.user,
  errors: store.errors,
  userData: store.userData, 
  friendsCheckins: store.friendsCheckins, 
  newCheckin: store.newCheckin
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getUserData: getUserData, getFriendsCheckins: getFriendsCheckins, 
  addNewCheckin: addNewCheckin}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
