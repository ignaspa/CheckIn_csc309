import React, { Component } from "react";
import "../../css/App.css";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { getAllUsers, getUserData, acceptRequest, removeRequest } from "../../redux/actions";
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';


const log = console.log;

class FriendRequests extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userData: {},
            potentialfriends: [],
            newUpdate: "",
            redirect: ""
        }
        this.changeUserStatus = this.changeUserStatus.bind(this);
    }

    componentDidMount() {
        this.props.getThisUser();
        this.props.getPotentialFriends();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            let pf = this.props.listUsers.listUsers;
            let cu = this.props.userData.userData;
            let reqs = [];
            log("cu fr", cu)
            if ( pf && cu && cu.friendRequests && pf.length) {
                for (let i = 0; i < pf.length; i++) {
                    log("pf", pf[i])
                    if (cu.friendRequests && cu.friendRequests.includes(pf[i]._id)) {
                        reqs.push(pf[i]);
                    }
                }
            }
            log("reqs",reqs);
            this.setState({ potentialfriends: reqs, user: cu });
            log("state", this.state);
        }
        console.log("this state", this.state);
    }
    render() {
        console.log("this state", this.state)
         if (this.state.redirect === "/user-dashboard") {
             Alert.warning(this.state.newUpdate, {
                 position: 'bottom',
                 timeout: '5000', 
             });
         }
        return (
            <div>
                <Alert stack={{limit: 1}} />
                <div className="pagetitle">
                    <h3>Friend Requests</h3>
                </div>
                <div className="pagetitle">
                    <h5>Your friend requests:</h5>
                </div>
                <RequestsTable results={this.state.potentialfriends} changeUserStatus={this.changeUserStatus} />
            </div>
        );
    }

    changeUserStatus = (userID, add, userName) => {
        if (add) {
            this.props.acceptRequest(userID);
            this.setState({ redirect: "/user-dashboard", newUpdate: "Added " + userName + " to your friends!" });
        }
        else {
            this.props.removeRequest(userID);
            this.setState({ redirect: "/user-dashboard", newUpdate: "Declined " + userName + "'s friend request." });
        }
    }
}

function RequestsTable(props) {
    log("results", props.results)

    const matchedUsers = props.results.map(person => (
        <tr key={person._id}>
            <td><img className="rounded-circle" width="55" height="55" src={person.profilepic} alt="profile pic" /></td>
            <td>{person.name}</td>
            <td>{person.username}</td>
            <td>
                <button
                    onClick={() => { props.changeUserStatus(person._id, true, person.username) }}
                    className="btn btn-success">
                    Accept
              </button>
            </td>
            <td>
                <button
                    onClick={() => { props.changeUserStatus(person._id, false, person.username) }}
                    className="btn btn-success">
                    Decline
              </button>
            </td>
        </tr>
    ));
    return (
        <div>
            <table className="table container-fluid">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Accept</th>
                        <th scope="col">Decline</th>
                    </tr>
                </thead>
                <tbody>
                    {matchedUsers}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = store => ({
    userData: store.userData,
    listUsers: store.listUsers
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ getPotentialFriends: getAllUsers, getThisUser: getUserData, acceptRequest: acceptRequest, removeRequest: removeRequest }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(FriendRequests);
