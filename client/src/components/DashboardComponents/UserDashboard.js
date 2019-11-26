/* The user dashboard */
import React, { Component } from "react";
import "../../css/UserDashboard.css";
import CheckInForm from "./CheckinForm";
import CheckInUpdates from "./UserData"
import UserNav from "./UserNav";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserData, getFriendsCheckins } from "../../redux/actions";


class UserDashboard extends Component {
  constructor(props) {
    super(props);
    // this.props.getFriendsCheckins();
    this.state = {
      allCheckins: []
    };
  }

  componentDidMount() {
    this.props.getUserData();
    this.props.getFriendsCheckins();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ allCheckins: nextProps.friendsCheckins.friendsCheckins }); 
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.checkins.length !== state.allCheckins.length) {
  //     return {
  //       allCheckins: props.checkins
  //     };
  //   }
  //   return null;
  // }

  submitCheckIn = state => {
    console.log("Submitting check in");

    let currentCheckins = this.state.allCheckins;
    currentCheckins.unshift({
      id: 0,
      action: state.action,
      location: state.location,
      message: state.message,
      time: state.time
    });

    this.setState({ allCheckins: currentCheckins }, () => {
      console.log(this.state);
    });
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
  friendsCheckins: store.friendsCheckins
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getUserData: getUserData, getFriendsCheckins: getFriendsCheckins}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
