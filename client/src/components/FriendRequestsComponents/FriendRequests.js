import React, { Component } from "react";
import "../../css/App.css";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { getAllUsers, getUserData, acceptRequest, removeRequest } from "../../redux/actions";

class FriendRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.listUsers != "undefined" && nextProps.user != {}) {
            console.log("lol")
        }
        console.log("next props", nextProps.listUsers)
        let pf = nextProps.listUsers.listUsers;
        let cu = nextProps.user;
        let reqs = [];
        console.log("cu: ", cu);
        console.log("pf: ", pf);
        if (cu.friendRequests && pf.length) {
            for (let i = 0; i < pf.length; i++) {
                if (cu.friendRequests.includes(pf[i]._id)) {
                    reqs.push(pf[i]);
                }
            }
        }
        this.setState({ potentialfriends: reqs, user: cu });
        console.log(this.state);
    }
    render() {
        if (this.state.redirect === "/user-dashboard") {
            return (
                <Redirect
                    to={{
                        pathname: '/user-dashboard/',
                        state: { lastEvent: this.state.newUpdate }
                    }}
                    push={true} />
            );
        }
        return (
            <div>
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
            this.props.addFriend(userID);
            this.setState({ redirect: "/user-dashboard", newUpdate: "Added " + userName + " to your friends!" });
        }
        else {
            this.props.removeRequest(userID);
            this.setState({ redirect: "/user-dashboard", newUpdate: "Declined " + userName + "'s friend request." });
        }
    }
}

function RequestsTable(props) {
    console.log("results", props.results)

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
    user: store.userData,
    listUsers: store.listUsers
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ getPotentialFriends: getAllUsers, getThisUser: getUserData, addFriend: acceptRequest, removeRequest: removeRequest }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(FriendRequests);