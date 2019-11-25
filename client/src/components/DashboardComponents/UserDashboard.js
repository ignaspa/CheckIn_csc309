/* The user dashboard */
import React, { Component } from "react";
import "../../css/UserDashboard.css";
import CheckInForm from "./CheckinForm";
import UserNav from "./UserNav";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserData, getFriendsCheckins } from "../../redux/actions";


class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.props.getFriendsCheckins();
    this.state = {
      allCheckins: this.props.checkins
    };
  }

  componentDidMount() {
    this.props.getUserData();
    this.props.getFriendsCheckins();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ allCheckins: nextProps.friendsCheckins });
  }

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

            {/* <CheckInUpdates
              allCheckins={this.state.allCheckins}
              currentUserId={0}
            /> */}
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
  checkins: store.friendsCheckins
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getUserData: getUserData, getFriendsCheckins: getFriendsCheckins}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
