/* The user dashboard */
import React, { Component } from "react";
import "../../css/UserDashboard.css";
import CheckInForm from "./CheckinForm";
import CheckInUpdates from "./UserData"
import UserNav from "./UserNav";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserData, getFriendsCheckins, addNewCheckin } from "../../redux/actions";
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';


class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCheckins: [],
      newCheckin: {}, 
      lastEvent: ""
    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({lastEvent: this.props.location.state.lastEvent})
    }
    this.props.getUserData();
    this.props.getFriendsCheckins();
  }

  componentWillReceiveProps(nextProps) {
   let friendsCheckins = nextProps.friendsCheckins.friendsCheckins
    this.setState({ allCheckins: friendsCheckins}); 
  }

  submitCheckIn = state => {
    console.log("Submitting check in");
    this.props.addNewCheckin(state.action, state.message, state.location)
    this.props.getFriendsCheckins()
  };

  render() {
    if (this.state.lastEvent != "") {
      Alert.warning(this.state.lastEvent, {
          position: 'bottom',
          timeout: '5000', 
      });
      this.setState({
        lastEvent: ""
      })
    }

    return (
      <div className="container-fluid gedf-wrapper">
        <Alert stack={{limit: 1}} />
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
