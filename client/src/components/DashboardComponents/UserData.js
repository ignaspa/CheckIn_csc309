import React, { Component } from "react";
import CheckInUpdate from "./CheckInUpdate"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getFriends, getUserData } from "../../redux/actions";

class Checkins extends Component {
    constructor(props) {
        super(props);
        this.props.getFriends()
        this.props.getUserData();
        this.state = {
          friends: this.props.friendsData, 
          checkins: this.props.allCheckins,
          userData: this.props.userData
        };
      }

      componentDidMount() {
        this.props.getFriends();
        this.props.getUserData();
      }
    
      componentWillReceiveProps(nextProps) {
        this.setState({ friends: nextProps.friendsData.friendsData }); 
        this.setState({ userData: nextProps.userData.userData })
      }  
    
    findUser = (userID) => {
        if (this.state.userData._id == userID.toString()) {
          return this.state.userData
        }

        for (let i = 0; i < this.state.friends.length; i++) {
            if (this.state.friends[i]._id === userID.toString()) {
                return this.state.friends[i]
            }
        }
        return null
    }

    render() {
        let rows = [];
        let checkins = this.props.allCheckins
        if (typeof(checkins) != "undefined") {
            for (let i = 0; i < checkins.length; i++) {
            let user = this.findUser(checkins[i].userid)
             rows.push(<CheckInUpdate 
                user={user}
                key={user.id}
                id={checkins[i].id}
                name={user.name}
                username={user.username}
                picture={user.picture}
                location={checkins[i].location}
                action={checkins[i].action}
                message={checkins[i].message}
                time = {checkins[i].time}
                />);
            }
        }

        return ( <div>
            {rows}
            </div>);
    }
    
}

const mapStateToProps = store => ({
    user: store.user,
    userData: store.userData, 
    errors: store.errors,
    friendsData: store.friendsData
  });
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({ getUserData: getUserData, getFriends: getFriends}, dispatch);
  };

const ConnectedCheckinInUpdates = connect(mapStateToProps,mapDispatchToProps) (Checkins);

export default class CheckinUpdates extends React.Component {

    render(){
       return (<ConnectedCheckinInUpdates
                allCheckins={this.props.allCheckins}
        />);
    }
 }
 



