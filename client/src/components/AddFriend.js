import React, { Component } from "react";
import "../css/App.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllUsers, getUserData, addFriend } from "../redux/actions";

class AddFriend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            results: [],
            potentialfriends: {}
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.changeUserStatus = this.changeUserStatus.bind(this);
    }
    componentDidMount() {
        this.props.getPotentialFriends();
        this.props.getThisUser();
    }
    componentWillReceiveProps(nextProps) {
        let pf = nextProps.listUsers.listUsers;
        let cu = nextProps.user.userData;
        this.setState({ potentialfriends: pf, user: cu });
    }
    render() {
        return (
            <div>
                <div className="pagetitle">
                    <h3>Add Friends</h3>
                </div>
                <div className="input-group input-group-sm mb-3 text-center deletebar">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">User</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={this.handleOnChange} />
                </div>
                <div className="pagetitle">
                    <h5>Users In System</h5>
                </div>
                <ResultsTable results={this.state.results} changeUserStatus={this.changeUserStatus} />
                <div className="pagetitle">
                    <h5>...</h5>
                </div>
            </div>
        );
    }

    handleOnChange = (event) => {
        this.setState({ results: [] });
        if (event.target.value === "") {
            return;
        }
        let newResults = [];
        for (let i = 0; i < this.state.potentialfriends.length; i++) {
            let person = this.state.potentialfriends[i]

            // check that we dont return users that are the current user, user that have requested 
            // this user to be a friend, or users this person already sent a request to.
            if (person._id != this.state.user._id && !this.state.user.friendRequests.includes(person._id) && !person.friendRequests.includes(this.state.user._id)) {
                if (person.name != null && person.name.toLowerCase().includes(event.target.value.toLowerCase())) {
                    newResults.push(this.state.potentialfriends[i]);
                }
                else if (person.username != null && person.username.toLowerCase().includes(event.target.value.toLowerCase())) {
                    newResults.push(this.state.potentialfriends[i]);
                }
            }
        }
        this.setState({ results: newResults });

    }

    changeUserStatus = (userID) => {
        this.props.addFriend(userID)
    }
}

function ResultsTable(props) {
    const matchedUsers = props.results.map(person => (
        <tr key={person._id}>
            <td>{person.name}</td>
            <td>{person.username}</td>
            <td>
                <button
                    onClick={() => props.changeUserStatus(person._id)}
                    className="btn btn-success">
                    Add Friend
              </button>
            </td>
        </tr>
    ));
    return (
        <div>
            <table className="table container-fluid">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Add</th>
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
    return bindActionCreators({ getPotentialFriends: getAllUsers, getThisUser: getUserData, addFriend: addFriend }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(AddFriend);